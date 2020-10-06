import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsersService } from "../services/users.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  public constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  public canActivate(): boolean {
    const token = this.usersService.getLoginToken();
    if (token) {
      return true;
    }

    this.router.navigateByUrl("/home/login");
    return false;
  }
}
