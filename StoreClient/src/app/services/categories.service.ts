import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/Category";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  public categories: Category[];

  constructor(private http: HttpClient) {
    this.categories = [];
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("http://localhost:3000/categories/");
  }

  public createNewCategory(category_name: string): Observable<void> {
    return this.http.post<void>(
      "http://localhost:3000/categories/",
      category_name
    );
  }
}
