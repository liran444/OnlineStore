import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ShoppingCartsService } from "src/app/services/shoppingCarts.service";
import { CartItemsService } from "src/app/services/cartItems.service";
import { UsersService } from "src/app/services/users.service";
import { SuccessfulLoginServerResponse } from "src/app/models/SuccessfulLoginServerResponse";
import { CartItem } from "src/app/models/CartItem";
import { Router } from "@angular/router";
import { DialogComponent } from "../dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { RecentShoppingCart } from "src/app/models/RecentShoppingCart";
import { ProductsService } from "src/app/services/products.service";
import { CategoriesService } from "src/app/services/categories.service";
import { Product } from "src/app/models/Product";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  @ViewChild("fileUpload", { static: false })
  fileUpload: ElementRef;

  public user: SuccessfulLoginServerResponse;
  public cart: CartItem[];
  public subText: string;
  public files = [];
  public uploadedImageName;
  public productForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public shoppingCartsService: ShoppingCartsService,
    public cartItemsService: CartItemsService,
    public usersService: UsersService,
    public productsService: ProductsService,
    public categoriesService: CategoriesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subText = "";

    if (this.usersService.loggedInUser.user_type === "ADMIN") {
      this.initProductForm();
    }

    if (this.usersService.isLoggedIn) {
      this.getRecentCartInfoByUserId();
    }
  }

  public createNewShoppingCart(): void {
    const observable = this.shoppingCartsService.createNewShoppingCart();
    observable.subscribe(
      () => { },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed creating a new shopping cart, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public getRecentCartInfoByUserId(): void {
    const observable = this.shoppingCartsService.getRecentCartInfoByUserId();
    observable.subscribe(
      (recent_cart) => {
        this.shoppingCartsService.recentShoppingCart = recent_cart;
        this.initCart(recent_cart);
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to get the recent cart, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public initCart(recent_cart: RecentShoppingCart): void {
    this.cartItemsService.totalSum = 0;

    if (recent_cart && recent_cart.is_checked_out === 0) {
      this.getCartItems();

      if (recent_cart.cart_total_price) {
        this.cartItemsService.totalSum =
          Math.round(recent_cart.cart_total_price * 100) / 100;
      }
    } else {
      this.cartItemsService.successfulCartItemsRetrieval = [];
    }
  }

  public getCartItems(): void {
    const observable = this.cartItemsService.getCartItems();
    observable.subscribe(
      (cart_items) => {
        this.cartItemsService.successfulCartItemsRetrieval = cart_items;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to get cart items, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public onClickedRemoveCartItem(id: number) {
    const observable = this.cartItemsService.deleteCartItem(id);
    observable.subscribe(
      () => {
        this.updateShoppingCart(0);
        this.updateCartTotalPriceInUI(id);
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to delete cart item, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public updateCartTotalPriceInUI(id: number) {
    let sumToSubtract = 0;

    this.cartItemsService.successfulCartItemsRetrieval = this.cartItemsService.successfulCartItemsRetrieval.filter(
      (item) => {
        if (item.product_id === id) {
          sumToSubtract = item.price * item.amount;
          return false;
        } else return true;
      }
    );

    this.cartItemsService.totalSum =
      Math.round((this.cartItemsService.totalSum - sumToSubtract) * 100) / 100;
  }

  public onClickedEmptyCart() {
    const observable = this.cartItemsService.deleteAllCartItems();
    observable.subscribe(
      () => {
        this.cartItemsService.successfulCartItemsRetrieval = [];
        this.cartItemsService.totalSum = 0;
        this.updateShoppingCart(0);
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to delete all cart items, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public onPurchaseClicked() {
    this.usersService.state = "ordering";
    this.router.navigate(["/order/cart"]);
  }

  public onClickedContinueShopping() {
    this.usersService.state = "shopping";
    this.router.navigate(["/shopping/cart"]);
  }

  public updateShoppingCart(is_checked_out: number) {
    const observable = this.shoppingCartsService.updateShoppingCart(
      is_checked_out
    );
    observable.subscribe(
      () => { },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to update shopping cart, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public openDialog(message: string, header: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message, header: header },
    });
  }

  public onAddNewProductClicked(): void {
    this.productsService.untouched_product_name = "";
    this.productsService.product_under_edit = new Product();
    this.productsService.product_under_edit.category_id = null;
    this.productsService.state = "adding";
  }

  public onUploadImageClicked() {
    // Clearing the files from previous upload
    this.files = [];

    // Extracting a reference to the DOM element named #fileUpload
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          name: file.name,
          data: file,
          inProgress: false,
          progress: 0,
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";

    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  public uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file.data);
    file.inProgress = true;
    let observable = this.productsService.uploadImage(formData);

    // Updating the view's precentage, based on the size of the current
    // uploaded block
    observable.pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round((event.loaded * 100) / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })
    );

    observable.subscribe((event: any) => {
      if (typeof event === "object" && event.body) {
        this.uploadedImageName = event.body;
        this.productsService.product_under_edit.image_file_name = event.body;
      }
    });
  }

  public onSaveButtonClicked(): void {
    if (this.productsService.state === "adding") {
      this.addNewProduct();
    } else if (this.productsService.state === "editing") {
      this.updateExistingProduct();
    }
  }

  public initAdminPanel(): void {
    this.productsService.untouched_product_name = "";
    this.productsService.product_under_edit = new Product();
    this.productsService.state = "idle";
  }

  public addNewProduct(): void {
    let product = this.productsService.product_under_edit;

    const observable = this.productsService.addNewProduct(product);
    observable.subscribe(
      (response) => {
        this.openDialog("Product has been added", "Success");
        product.amount = 1;
        product.id = response.id;
        this.insertProductIntoProductsArray(product);
        this.initAdminPanel();
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to , ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public insertProductIntoProductsArray(product: Product): void {
    let lastIndex = this.productsService.productsArray.length - 1;
    this.productsService.productsArray[lastIndex].id = product.id;
    this.productsService.productsArray[lastIndex].category_id = product.category_id;
    this.productsService.productsArray[lastIndex].amount = 1;
    this.productsService.productsArray[lastIndex].name = product.name;
    this.productsService.productsArray[lastIndex].price = product.price;
    this.productsService.productsArray[lastIndex].image_file_name = product.image_file_name;
  }

  public updateExistingProduct(): void {
    let product = this.productsService.product_under_edit;
    // This is used to tell whether the name has been updated as well
    // due to there being a server-side validation for duplicate product's name
    if (this.productsService.untouched_product_name === product.name) {
      product.is_new_name = false;
    } else {
      product.is_new_name = true;
    }

    const observable = this.productsService.updateProduct(product);
    observable.subscribe(
      () => {
        this.openDialog("Product has been updated", "Success");
        this.updateProductInUI(product);
        this.initAdminPanel();
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to , ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public updateProductInUI(product: Product): void {
    this.productsService.productsArray.forEach((item) => {
      if (item.id === product.id) {
        item.name = product.name;
        item.price = product.price;
        item.category_id = product.category_id;
        item.image_file_name = product.image_file_name;
      }
    });
  }

  public initProductForm(): void {
    this.productForm = this.formBuilder.group({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_ ]{2,18}$"),
      ]),
      price: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{1,4}(\.\d{1,2})?$/),
      ]),
      category_id: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{1,5}"),
      ]),
    });
  }

  public get form(): any {
    return this.productForm.controls;
  }
}
