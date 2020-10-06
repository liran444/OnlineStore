import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserLoginDetails } from "../models/UserLoginDetails";
import { UserRegisterDetails } from "../models/UserRegisterDetails";
import { SuccessfulLoginServerResponse } from "../models/SuccessfulLoginServerResponse";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  public isLoggedIn: boolean;
  public userLoginDetails: UserLoginDetails;
  public loggedInUser: SuccessfulLoginServerResponse;
  public state: string;

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
    this.userLoginDetails = new UserLoginDetails();
    this.loggedInUser = new SuccessfulLoginServerResponse();
    this.state = "idle";
  }

  public login(
    userLoginDetails: UserLoginDetails
  ): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(
      "http://localhost:3000/users/login",
      userLoginDetails
    );
  }

  public addUser(userRegisterDetails: UserRegisterDetails): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(
      "http://localhost:3000/users/",
      userRegisterDetails
    );
  }

  public getLoginToken(): string {
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    return userData?.token
  }

  public initLoggedInState(
    successfulServerRequestData: SuccessfulLoginServerResponse
  ): void {
    this.isLoggedIn = true;
    this.loggedInUser = successfulServerRequestData;
    this.loggedInUser.token = "Bearer " + this.loggedInUser.token;
    this.setUserInfo(this.loggedInUser);
  }

  public setUserInfo(loggedInUser: SuccessfulLoginServerResponse): void {
    sessionStorage.setItem("userData", JSON.stringify(loggedInUser));
  }

  public getUserInfo(): any {
    this.loggedInUser = JSON.parse(sessionStorage.getItem("userData"));
    if (this.loggedInUser?.token !== undefined) {
      this.isLoggedIn = true;
    }
  }

  public clearUserDataFromServerCache(): Observable<void> {
    return this.http.delete<void>("http://localhost:3000/users/logout");
  }

  public logout(): void {
    sessionStorage.removeItem("userData");
    this.isLoggedIn = false;
    this.userLoginDetails = new UserLoginDetails();
    this.loggedInUser = new SuccessfulLoginServerResponse();
  }
}
