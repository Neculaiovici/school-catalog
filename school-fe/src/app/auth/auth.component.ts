import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserInterface } from '../common/model/user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);

  @Output() onSubmitEvent = new EventEmitter<UserInterface>();
  @Input() submitLabel: string | undefined;
  @Input() pageLabel: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  public getUsernameErrorMessage() {
    if(this.username.hasError('required')){
      return 'You must enter a value';
    }
    return '';
  }

  public getPasswordErrorMessage() {
    if(this.password.hasError('required')){
      return 'You must enter a value';
    }
    return '';
  }

  public onSubmit(user:UserInterface) {
    this.onSubmitEvent.emit({
      username: this.username.value,
      password: this.password.value
    })
  }
}
