import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialog } from "@angular/material/dialog";

export interface DialogData {
  name: string,
  password: string
}

@Component({
  selector: 'dialog-overview',
  templateUrl: './dialog-overview.component.html',
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}]
})
export class DialogOverviewComponent {

  public name: string = "";
  public hide = true;
  public password = new FormControl('', [Validators.required]);

  constructor(public readonly dialog: MatDialog) {}
}