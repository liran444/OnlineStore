import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  public owner: string = "Liran Dekamhi";
  public currentYear: number = new Date().getFullYear();
}
