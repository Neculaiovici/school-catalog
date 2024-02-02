import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../common/model/user';
import { AuthService } from './auth.service';
import { Profile } from '../common/model/profile';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  //create user input
  public retypePassword = new FormControl('', [Validators.required]);
  public role = new FormControl('', [Validators.required]);
  public firstName = new FormControl
  public lastName = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required]);
  public age = new FormControl('', [Validators.required]);
  public profileAvatar = new FormControl('', [Validators.required]);

  @Output() onSubmitEvent = new EventEmitter<User>();
  @Input() submitLabel: string | undefined;
  @Input() pageLabel: string | undefined;

  @Input() showRetypePassword = false;
  @Input() showRole = false;
  @Input() showFirstName = false;
  @Input() showLastName = false;
  @Input() showEmail = false;
  @Input() showAge = false;
  @Input() showProfileAvatar = false;

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe() // for test be
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

  public onSubmit() {
    const user: User = {
      username: this.username.value,
      password: this.password.value,
      role: this.role.value,
      profile: {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        age: this.age.value,
        profileAvatar: this.profileAvatar.value
      }
    }

    console.log(user);
    this.onSubmitEvent.emit(user)
  }
}
