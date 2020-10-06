import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartItem } from "../models/CartItem";
import { SuccessfulCartItemRetrieval } from "../models/SuccessfulCartItemRetrieval";

@Injectable({
  providedIn: "root",
})
export class CartItemsService {
  public totalSum: number;
  public successfulCartItemsRetrieval: SuccessfulCartItemRetrieval[];

  constructor(private http: HttpClient) {
    this.init();
  }

  public getCartItems(): Observable<SuccessfulCartItemRetrieval[]> {
    return this.http.get<SuccessfulCartItemRetrieval[]>(
      "http://localhost:3000/cart_items/"
    );
  }

  public addItemToCart(cartItem: CartItem): Observable<void> {
    return this.http.post<void>("http://localhost:3000/cart_items/", cartItem);
  }

  public deleteCartItem(product_id: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:3000/cart_items/remove_item?product_id=${product_id}`
    );
  }

  public deleteAllCartItems(): Observable<void> {
    return this.http.delete<void>("http://localhost:3000/cart_items/");
  }

  public init(): void {
    this.successfulCartItemsRetrieval = [];
    this.totalSum = 0;
  }
}
