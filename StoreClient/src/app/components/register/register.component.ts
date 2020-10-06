import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { UserRegisterDetails } from "src/app/models/UserRegisterDetails";
import { CitiesService } from "src/app/services/cities.service";
import { DialogComponent } from "../dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public userRegisterDetails: UserRegisterDetails;
  public formJoin: object;
  public stepOneRegisterForm: FormGroup;
  public stepTwoRegisterForm: FormGroup;
  public isFirstStepDone: boolean;
  public emailRegexExp: RegExp;

  constructor(
    public usersService: UsersService,
    public citiesService: CitiesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.userRegisterDetails = new UserRegisterDetails();
    this.usersService = usersService;
  }

  ngOnInit(): void {
    this.getCities();
    this.isFirstStepDone = false;
    this.emailRegexExp = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i
    );

    this.initStepOneForm();
    this.initStepTwoForm();
  }

  public initStepOneForm(): void {
    this.stepOneRegisterForm = this.formBuilder.group(
      {
        social_number: new FormControl("", [
          Validators.required,
          Validators.pattern("^[0-9]{9}"),
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.pattern(this.emailRegexExp),
        ]),
        password: new FormControl("", [
          Validators.required,
          Validators.pattern("^[A-Za-z0-9]{4,16}"),
        ]),
        confirm_password: new FormControl("", [
          Validators.required,
          Validators.pattern("^[A-Za-z0-9]{4,16}"),
        ]),
      },
      {
        validator: this.mustMatch("password", "confirm_password"),
      }
    );
  }

  public initStepTwoForm(): void {
    this.stepTwoRegisterForm = this.formBuilder.group({
      firstname: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z]{2,18}$"),
      ]),
      lastname: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z]{2,18}$"),
      ]),
      city_id: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{1,5}"),
      ]),
      street: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z0-9_ ]{3,25}"),
      ]),
    });
  }

  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public get stepOne(): any {
    return this.stepOneRegisterForm.controls;
  }

  public get stepTwo(): any {
    return this.stepTwoRegisterForm.controls;
  }

  public onClickedDisplayLogin(): void {
    this.router.navigate(["./login"], { relativeTo: this.route.parent });
  }

  /**
   * On click handler for moving onto the next step
   */
  public onNextStepClicked(): void {
    this.isFirstStepDone = true;
  }

  /**
   * On click handler for moving back to the previous step
   */
  public onPreviousStepClicked(): void {
    this.isFirstStepDone = false;
  }

  public register(): void {
    this.insertValuesToModel();

    const observable = this.usersService.addUser(this.userRegisterDetails);
    observable.subscribe(
      (successfulLoginServerResponse) => {
        this.usersService.initLoggedInState(successfulLoginServerResponse);
        let header = `Welcome ${successfulLoginServerResponse.firstname}`;
        let message = `You've successfully logged in for the first time!`;
        this.openDialog(message, header);
        this.router.navigate(["/home/cart"]);
      },
      (serverErrorResponse) => {
        let header = `Error! Status: ${serverErrorResponse.status}`;
        let message = `Failed to sign up, ${serverErrorResponse.error}`;
        this.openDialog(message, header);
      }
    );
  }

  public openDialog(message: string, header: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message, header: header },
    });
  }

  public insertValuesToModel() {
    this.userRegisterDetails.social_number = this.stepOneRegisterForm.value.social_number;
    this.userRegisterDetails.email = this.stepOneRegisterForm.value.email;
    this.userRegisterDetails.password = this.stepOneRegisterForm.value.password;
    this.userRegisterDetails.firstname = this.stepTwoRegisterForm.value.firstname;
    this.userRegisterDetails.lastname = this.stepTwoRegisterForm.value.lastname;
    this.userRegisterDetails.city_id = this.stepTwoRegisterForm.value.city_id;
    this.userRegisterDetails.street = this.stepTwoRegisterForm.value.street;
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
}
