import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationInterceptor } from "../interceptors/AuthenticationInterceptor";
import { RouterModule } from "@angular/router";
import { RoutingModule } from "./routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { LayoutComponent } from "../components/layout/layout.component";
import { LoginComponent } from "../components/login/login.component";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { OrderComponent } from "../components/order/order.component";
import { CartComponent } from "../components/cart/cart.component";
import { HomeComponent } from "../components/home/home.component";
import { ShoppingComponent } from "../components/shopping/shopping.component";
import { RegisterComponent } from "../components/register/register.component";
import { DialogComponent } from "../components/dialog/dialog.component";

import { UsersService } from "../services/users.service";
import { ProductsService } from "../services/products.service";
import { CartItemsService } from "../services/cartItems.service";
import { ShoppingCartsService } from "../services/shoppingCarts.service";
import { CitiesService } from "../services/cities.service";
import { CategoriesService } from "../services/categories.service";
import { OrdersService } from "../services/orders.service";

import { CategoriesPipe } from "../pipes/CategoriesPipe";
import { ProductsPipeBySubtext } from "../pipes/ProductsPipeBySubtext";
import { HighlightPipe } from "../pipes/HighlightPipe";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    ShoppingComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    OrderComponent,
    CategoriesPipe,
    ProductsPipeBySubtext,
    HighlightPipe,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [
    UsersService,
    ProductsService,
    CartItemsService,
    ShoppingCartsService,
    CitiesService,
    CategoriesService,
    OrdersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
