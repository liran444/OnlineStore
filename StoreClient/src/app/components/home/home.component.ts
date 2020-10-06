import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { OrdersService } from "src/app/services/orders.service";
import { ProductsService } from "src/app/services/products.service";
import { UsersService } from "src/app/services/users.service";
import { CartItemsService } from "src/app/services/cartItems.service";
import { DialogComponent } from "../dialog/dialog.component";

import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ordersService: OrdersService,
    public productsService: ProductsService,
    public cartItemsService: CartItemsService,
    public usersService: UsersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.usersService.state = "idle";

    if (this.usersService.isLoggedIn == true) {
      this.router.navigate(["cart"], { relativeTo: this.route });
    } else {
      this.router.navigate(["login"], { relativeTo: this.route });
    }

    if (this.productsService.number_of_products == 0) {
      this.countProducts();
    }

    if (this.ordersService.number_of_orders == 0) {
      this.countOrders();
    }
  }

  public countProducts(): void {
    const observable = this.productsService.countProducts();
    observable.subscribe(
      (total) => {
        this.productsService.number_of_products = total.number_of_products;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to count number of products, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public countOrders(): void {
    const observable = this.ordersService.countOrders();
    observable.subscribe(
      (total) => {
        this.ordersService.number_of_orders = total.number_of_orders;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to count number of orders, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public onClickedDisplayLogin(): void {
    this.router.navigate(["login"], { relativeTo: this.route });
  }

  public onClickedDisplayRegister(): void {
    this.router.navigate(["sign-up"], { relativeTo: this.route });
  }

  public openDialog(message: string, header: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message, header: header },
    });
  }
}
