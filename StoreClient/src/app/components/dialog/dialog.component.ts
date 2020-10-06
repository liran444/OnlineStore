import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { OrdersService } from "src/app/services/orders.service";
import { UsersService } from "src/app/services/users.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})
export class DialogComponent {
  public message: string;
  public header: string;
  public fileText: string;
  public fileName: string;
  public fileUrl: any;

  constructor(
    private sanitizer: DomSanitizer,
    public ordersService: OrdersService,
    public usersService: UsersService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.message = data.message;
    this.header = data.header;
    this.fileText = data?.fileText;
    this.fileName = data?.fileName;
  }

  ngOnInit() {
    if (this.fileText) {
      const data = this.fileText;
      // Creating a blob to contain the data - "Receipt"
      const blob = new Blob([data], { type: "application/octet-stream" });

      // Sanitizing the values to be safe for usage in different DOM contexts
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        window.URL.createObjectURL(blob)
      );
    }
  }
}
