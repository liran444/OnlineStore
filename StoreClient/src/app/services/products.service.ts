import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/Product";
import { NumberOfProducts } from "../models/NumberOfProducts";
import { CartItem } from "../models/CartItem";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  public productsArray: Product[];
  public categorizedProductsArray: Product[];
  public number_of_products: number;
  public product_under_edit: Product;
  public untouched_product_name: string;
  public state: string;

  constructor(private http: HttpClient) {
    this.productsArray = [];
    this.categorizedProductsArray = [];
    this.number_of_products = 0;
    this.product_under_edit = new Product();
    this.untouched_product_name = "";
    this.state = "idle";
  }

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/products/");
  }

  public getProductsByCategoryID(category_id: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:3000/products/by_category_id?category_id=${category_id}`
    );
  }

  public countProducts(): Observable<NumberOfProducts> {
    return this.http.get<NumberOfProducts>(
      "http://localhost:3000/products/number_of_products"
    );
  }

  public addNewProduct(productDetails: Product): Observable<any> {
    return this.http.post<any>(
      "http://localhost:3000/products/",
      productDetails
    );
  }

  public updateProduct(productDetails: Product): Observable<void> {
    return this.http.put<void>(
      "http://localhost:3000/products/",
      productDetails
    );
  }

  public uploadImage(formData: any) {
    return this.http.post<any>(
      "http://localhost:3000/products/upload_image_file",
      formData,
      {
        reportProgress: true,
        observe: "events",
      }
    );
  }
}
