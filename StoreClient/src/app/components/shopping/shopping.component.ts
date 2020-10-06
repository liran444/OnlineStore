import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Product } from "src/app/models/Product";
import { Router } from "@angular/router";
import { CartItemsService } from "src/app/services/cartItems.service";
import { UsersService } from "src/app/services/users.service";
import { CartItem } from "src/app/models/CartItem";
import { ShoppingCartsService } from "src/app/services/shoppingCarts.service";
import { CategoriesService } from "src/app/services/categories.service";
import { DialogComponent } from "../dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-shopping",
  templateUrl: "./shopping.component.html",
  styleUrls: ["./shopping.component.css"],
})
export class ShoppingComponent implements OnInit {
  public maxAmount: number;
  public minAmount: number;
  public clickedCategoryID: number;
  public isMyCartDisplayed: boolean;
  public subText: string;

  constructor(
    private router: Router,
    private shoppingCartsService: ShoppingCartsService,
    public categoriesService: CategoriesService,
    public productsService: ProductsService,
    public cartItemsService: CartItemsService,
    public usersService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.router.navigate(["/shopping/cart"]);
    // Initializing values
    this.usersService.state = "shopping";
    this.clickedCategoryID = 0;
    this.maxAmount = 99;
    this.minAmount = 1;
    this.isMyCartDisplayed = true;
    this.subText = "";

    this.getAllProducts();
    this.getCategories();
  }

  public openDialog(message: string, header: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message, header: header },
    });
  }

  /**
   * Handler for Showing or Hiding the cart on display
   */
  public onMyCartButtonClicked() {
    this.isMyCartDisplayed = !this.isMyCartDisplayed;
  }

  public increaseAmount(product: Product) {
    if (product.amount < this.maxAmount) {
      product.amount++;
    }
  }

  public decreaseAmount(product: Product) {
    if (product.amount > this.minAmount) {
      product.amount--;
    }
  }

  public onEditProductClicked(product: Product) {
    this.productsService.untouched_product_name = product.name;
    this.productsService.product_under_edit = { ...product };
    this.productsService.state = "editing";
  }

  public onAddItemToCartClicked(product: Product) {
    let cart_item = new CartItem();
    cart_item.product_id = product.id;
    cart_item.amount = product.amount;

    const observable = this.cartItemsService.addItemToCart(cart_item);
    observable.subscribe(
      () => {
        this.initCartUpdateProcess(product);

        let header = "Success!";
        let message = `Successfully added to the cart: (${product.amount}) ${product.name}`;
        this.openDialog(message, header);

        // Set the amount on the selection panel back to its initial value
        product.amount = 1;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to add item to cart, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public initCartUpdateProcess(product: Product): void {
    this.updateShoppingCart(0);
    this.updateCartUI(product);
    this.updateTotalPriceInUI(product);
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

  public updateTotalPriceInUI(product: Product) {
    this.cartItemsService.totalSum =
      Math.round(
        (this.cartItemsService.totalSum + product.price * product.amount) * 100
      ) / 100;
  }

  public updateCartUI(product: Product) {
    let isFoundInCart = false;
    this.cartItemsService.successfulCartItemsRetrieval.forEach((item) => {
      if (isFoundInCart === false && item.product_id === product.id) {
        item.amount += product.amount;
        isFoundInCart = true;
      }
    });

    if (!isFoundInCart) {
      // If the product was not found inside the cart, then a duplicate object will
      // be created and pushed into an array of cart items
      let productDuplicate = {
        product_id: product.id,
        price: product.price,
        amount: product.amount,
        image_file_name: product.image_file_name,
        name: product.name,
      };
      this.cartItemsService.successfulCartItemsRetrieval.push(productDuplicate);
    }
  }

  public getAllProducts() {
    const observable = this.productsService.getAllProducts();
    observable.subscribe(
      (products) => {
        this.productsService.productsArray = products;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to get products, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public getCategories() {
    const observable = this.categoriesService.getAllCategories();
    observable.subscribe(
      (categories) => {
        this.categoriesService.categories = categories;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to get categories, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  /**
   * Used to filter the products by category
   * @param id - Category ID
   */
  public onClickedSetCurrentCategory(id: number) {
    this.clickedCategoryID = id;
  }
}
