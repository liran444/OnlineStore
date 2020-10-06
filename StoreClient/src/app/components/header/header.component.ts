import { Component, OnInit, OnDestroy } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { CartItemsService } from "src/app/services/cartItems.service";
import { ShoppingCartsService } from "src/app/services/shoppingCarts.service";
import { DialogComponent } from "../dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public store: { phone: string; email: string };

  constructor(
    public dialog: MatDialog,
    public usersService: UsersService,
    private cartItemsService: CartItemsService,
    private shoppingCartsService: ShoppingCartsService,
    private router: Router
  ) {
    this.store = {
      email: "online@market.email.com",
      phone: "+972-50-455-0188",
    };
  }

  ngOnInit(): void {
    this.usersService.getUserInfo();
  }

  ngOnDestroy(): void {
    this.clearUserDataFromServerCache();
  }

  public clearUserDataFromServerCache(): void {
    const observable = this.usersService.clearUserDataFromServerCache();
    observable.subscribe(
      () => {},
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Logout process failed, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public logout(): void {
    this.clearUserDataFromServerCache();
    this.usersService.logout();
    this.cartItemsService.init();
    this.shoppingCartsService.recentShoppingCart = null;
    this.router.navigate(["/home/login"]);
  }

  public openDialog(message: string, header: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message, header: header },
    });
  }
}
