import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AddOrder } from "../models/AddOrder";
import { NumberOfOrders } from "../models/NumberOfOrders";
import { UnavailableDates } from "../models/UnavailableDates";
import { Order } from "../models/Order";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  public number_of_orders: number;
  public unavailableDates: UnavailableDates;
  public order_details: AddOrder;

  constructor(private http: HttpClient) {
    this.number_of_orders = 0;
    this.unavailableDates = {};
    this.order_details = new AddOrder();
  }

  public addOrder(orderDetails: AddOrder): Observable<void> {
    return this.http.post<void>("http://localhost:3000/orders/", orderDetails);
  }

  public countOrders(): Observable<NumberOfOrders> {
    return this.http.get<NumberOfOrders>(
      "http://localhost:3000/orders/number_of_orders"
    );
  }

  public getUnavailableOrderDates(): Observable<UnavailableDates> {
    return this.http.get<UnavailableDates>(
      "http://localhost:3000/orders/unavailable_dates"
    );
  }

  public getOrderData(): Observable<Order[]> {
    return this.http.get<Order[]>(
      "http://localhost:3000/orders/get_order_data"
    );
  }
}
