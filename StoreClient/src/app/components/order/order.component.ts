import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CitiesService } from "src/app/services/cities.service";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from "@angular/forms";
import { AddOrder } from "src/app/models/AddOrder";
import { OrdersService } from "src/app/services/orders.service";
import { UsersService } from "src/app/services/users.service";
import { SuccessfulLoginServerResponse } from "src/app/models/SuccessfulLoginServerResponse";
import { CartItemsService } from "src/app/services/cartItems.service";
import { DialogComponent } from "../dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ShoppingCartsService } from "src/app/services/shoppingCarts.service";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  public orderDetails: AddOrder;
  public orderForm: FormGroup;
  public loggedInUser: SuccessfulLoginServerResponse;

  public tomorrow_date: string;
  public max_date: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public citiesService: CitiesService,
    public ordersService: OrdersService,
    public usersService: UsersService,
    public cartItemsService: CartItemsService,
    public shoppingCartsService: ShoppingCartsService,
    public dialog: MatDialog
  ) {
    this.orderDetails = new AddOrder();
  }

  ngOnInit(): void {
    if (this.cartItemsService.successfulCartItemsRetrieval.length === 0) {
      this.router.navigate(["/shopping/cart"]);
    } else {
      this.router.navigate(["/order/cart"]);
      this.loggedInUser = this.usersService.loggedInUser;
      this.usersService.state = "ordering";

      this.getCities();
      this.initForm();
      this.getUnavailableOrderDates();
      this.initDatePicker();
    }
  }

  public initDatePicker(): void {
    let tomorrow_date = new Date();
    let max_date = new Date();
    tomorrow_date.setDate(tomorrow_date.getDate() + 1);
    max_date.setDate(max_date.getDate() + 30);

    this.tomorrow_date = this.formatDate(tomorrow_date);
    this.max_date = this.formatDate(max_date);
  }

  public initForm(): void {
    this.orderForm = this.formBuilder.group({
      city_id: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{1,5}"),
      ]),
      street: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_ ]{3,25}"),
      ]),
      ship_date: new FormControl("", [Validators.required]),
      credit_card: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{16}"),
      ]),
    });
  }

  public get form(): any {
    return this.orderForm.controls;
  }

  public onSubmittedAddOrder(): void {
    let shipping_date = this.returnValidatedDate();
    let last_digits = this.orderForm.value.credit_card.slice(12, 16);

    this.insertFormValuesToModel(shipping_date, last_digits);

    const observable = this.ordersService.addOrder(this.orderDetails);
    observable.subscribe(
      () => {
        this.updateShoppingCart(1);
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Order Failed, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  /**
   * This is used in order to fix another timezone related issue
   * - returns a formated date string
   */
  public returnValidatedDate(): string {
    let date = new Date(this.orderForm.value.ship_date);
    date.setMinutes(date.getMinutes() + Math.abs(date.getTimezoneOffset()));

    return this.formatDate(date);
  }

  public insertFormValuesToModel(date: string, last_digits: number) {
    this.orderDetails.city_id = this.orderForm.value.city_id;
    this.orderDetails.street = this.orderForm.value.street;
    this.orderDetails.ship_date = date;
    this.orderDetails.last_digits = last_digits;
  }

  public getCities() {
    const observable = this.citiesService.getCities();
    observable.subscribe(
      (cities) => {
        this.citiesService.cities = cities;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to get cities, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  /**
   * Sends a request to the server in order to update the cart in the DB
   * @param is_checked_out - Boolean which is used to declare whether the cart is checked out or not
   */
  public updateShoppingCart(is_checked_out: number) {
    const observable = this.shoppingCartsService.updateShoppingCart(
      is_checked_out
    );
    observable.subscribe(
      () => {
        this.getOrderData();
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to update shopping cart, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  /**
   * Retrieves from the server every unavailable date for orders
   */
  public getUnavailableOrderDates() {
    const observable = this.ordersService.getUnavailableOrderDates();
    observable.subscribe(
      (unavailableDates) => {
        this.ordersService.unavailableDates = unavailableDates;
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to get unavaiable order dates, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  /**
   * Datepicker's filter - used to disable unavailable dates from being selected
   * @param date - Date Object
   */
  public myFilter = (date: Date | null): boolean => {
    const datepicker_date = date || new Date();

    // Mapping the unavailable dates and iterating through them in order to fix a timezone issue
    let mapped_unavailable_dates = Object.values(
      this.ordersService.unavailableDates
    ).map((element) => {
      let date = new Date(element.ship_date);
      // Fixing a timezone issue
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      date.setDate(date.getDate());
      // Returning a valid string date
      return this.formatDate(date);
    });

    // Iterating through the array to disable every unavailable date on the Date Picker
    return !mapped_unavailable_dates.find((element: any) => {
      return element === this.formatDate(datepicker_date);
    });
  };

  /**
   *  Returning a date in the following format: yyyy-mm-dd
   */
  public formatDate(date): string {
    return date.toISOString().split("T")[0];
  }

  /**
   * Gets the data on the recent purchase so that it can be turned into a receipt later on
   */
  public getOrderData(): void {
    const observable = this.ordersService.getOrderData();
    observable.subscribe(
      (order_data) => {
        let fileText = this.formatOrderData(order_data);
        let fileName = `order#${order_data[0].id}_receipt.txt`;
        this.openDialog("Success!", "Order Completed", fileText, fileName);

        this.updateUserDataInUI();
        this.router.navigate(["/shopping/cart"]);
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to get unavaiable order dates, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public updateUserDataInUI(): void {
    let today = this.formatDate(new Date());
    this.ordersService.order_details = this.orderDetails;
    Object.assign(this.usersService.loggedInUser, {
      last_order_date: today,
      last_open_cart_date: today,
    });
  }

  /**
   * Formats the order data into a string in the form of a Receipt
   * @param order_data - Data retrieved from the server regarding the recent purchase
   */
  public formatOrderData(order_data: Order[]): string {
    let fileText = `
    Order ID: ${order_data[0].id} \r\n
    Order Made By: ${order_data[0].firstname} ${order_data[0].lastname} \r\n
    Order Date: ${order_data[0].order_date} \r\n
    Shipping Date: ${order_data[0].ship_date} \r\n
    Shipping City: ${order_data[0].ship_city} \r\n
    Shipping Street: ${order_data[0].ship_address} \r\n
    Total Price: ${order_data[0].cart_total_price} \r\n
    Credit Card Last Digits: ${order_data[0].last_digits} \r\n
    Purchased Items: \r\n`;

    let items = "";
    order_data.forEach((element) => {
      items =
        items +
        `\r\n___________________\r\n
    \r\n
    Name: ${element.cart_item} \r\n
    Amount: ${element.amount} \r\n
    Unit Price: ${element.product_price} \r\n
    Total Price Per Product: ${element.product_total_price} \r\n`;
    });

    return fileText + items;
  }

  public openDialog(
    message: string,
    header: string,
    fileText?: string,
    fileName?: string
  ): void {
    this.dialog.open(DialogComponent, {
      data: {
        message: message,
        header: header,
        fileText: fileText,
        fileName: fileName,
      },
    });
  }
}
