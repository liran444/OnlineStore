import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  // They will need to use their own userService for this (need save the token there after login)
  constructor(private usersService: UsersService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with our token if available
    let token: string;
    token = this.usersService.getLoginToken();
    if (token) {
      token = token;
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(request);
  }
}
