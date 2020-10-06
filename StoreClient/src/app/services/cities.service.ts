import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { City } from "../models/City";

@Injectable({
  providedIn: "root",
})
export class CitiesService {
  public cities: City[];

  constructor(private http: HttpClient) {
    this.cities = [];
  }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>("http://localhost:3000/cities/");
  }
}
