import { Component, EventEmitter, Inject, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ProfileInterface } from "src/app/model/profile.interface";
import { UserInterface } from "src/app/model/user.interface";
import { DashboardService } from "../../dashboard.service";

export interface DialogData {
  shwoPassword?: boolean;
  showFirstName?: boolean;
  showLastName?: boolean;
  showEmail?: boolean;
  showAge?: boolean;
  showProfileAvatar?: boolean;
  title?: string;
}

@Component({
  selector: 'dialog-overview',
  templateUrl: './dialog-overview.component.html'
})
export class DialogOverviewComponent {
  public hide = true;
  public updateForm: FormGroup;

  @Input() public dialogData!: DialogData;

  @Output() onSubmitEvent = new EventEmitter<UserInterface | ProfileInterface>(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly dashboardService: DashboardService) {
    this.updateForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      profileAvatar: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit() {
    // debugger;
    // this.onSubmitEvent.emit(this.updateForm.value);
    const passwordFormControl = this.updateForm.get('password')?.value;
    if(passwordFormControl){
      this.dashboardService.updatePassword(this.updateForm.value).subscribe(resp => console.log(resp))
    }
    
  }
}