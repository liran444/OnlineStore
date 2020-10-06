import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RecentShoppingCart } from "../models/RecentShoppingCart";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartsService {
  public recentShoppingCart: RecentShoppingCart;

  constructor(private http: HttpClient) {
    this.recentShoppingCart = null;
  }

  public createNewShoppingCart(): Observable<void> {
    return this.http.post<void>("http://localhost:3000/shopping_carts/", null);
  }

  public getRecentCartInfoByUserId(): Observable<RecentShoppingCart> {
    return this.http.get<RecentShoppingCart>(
      "http://localhost:3000/shopping_carts/"
    );
  }

  public deleteOpenCartByCartId(): Observable<void> {
    return this.http.delete<void>("http://localhost:3000/shopping_carts/");
  }

  public updateShoppingCart(is_checked_out: number): Observable<void> {
    return this.http.put<void>(
      `http://localhost:3000/shopping_carts/update_cart`,
      { is_checked_out }
    );
  }
}
