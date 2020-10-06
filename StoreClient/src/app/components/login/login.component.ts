import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public email: FormControl;
  public password: FormControl;
  public emailRegexExp: RegExp;

  constructor(
    public usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.emailRegexExp = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
    );

    this.initForm();
  }

  public initForm(): void {
    this.email = new FormControl("", [
      Validators.required,
      Validators.pattern(this.emailRegexExp),
    ]);
    this.password = new FormControl("", [
      Validators.required,
      Validators.pattern("^[A-Za-z0-9]{4,16}"),
    ]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  public onClickedDisplayRegister(): void {
    this.router.navigate(["./sign-up"], { relativeTo: this.route.parent });
  }

  public login(): void {
    this.usersService.userLoginDetails.email = this.email.value;
    this.usersService.userLoginDetails.password = this.password.value;

    const observable = this.usersService.login(
      this.usersService.userLoginDetails
    );
    observable.subscribe(
      (successfulLoginServerResponse) => {
        this.usersService.initLoggedInState(successfulLoginServerResponse);
        let header = `Welcome ${successfulLoginServerResponse.firstname}`;
        let message = `You've successfully logged in!`;
        this.openDialog(message, header);
        this.router.navigate(["/home/cart"]);
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to log-in, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public openDialog(message: string, header: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message, header: header },
    });
  }
}
