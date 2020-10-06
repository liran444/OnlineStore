import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../components/login/login.component";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "../components/register/register.component";
import { LoginGuard } from "../guard/login.guard";
import { HomeComponent } from "../components/home/home.component";
import { CartComponent } from "../components/cart/cart.component";
import { ShoppingComponent } from "../components/shopping/shopping.component";
import { OrderComponent } from "../components/order/order.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "sign-up", component: RegisterComponent },
      { path: "cart", canActivate: [LoginGuard], component: CartComponent },
    ],
  },
  {
    path: "shopping",
    canActivate: [LoginGuard],
    component: ShoppingComponent,
    children: [{ path: "cart", component: CartComponent }],
  },
  {
    path: "order",
    canActivate: [LoginGuard],
    component: OrderComponent,
    children: [{ path: "cart", component: CartComponent }],
  },
  { path: "**", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
