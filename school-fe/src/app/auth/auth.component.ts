import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UserInterface } from '../model/user.interface';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { RoleEnum } from '../enum/role.enum';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public hide = true;
  public username = new FormControl('', [Validators.required]);
  public password = new FormControl('', [Validators.required]);
  //create user input
  public retypedPassword = new FormControl('', [Validators.required]);
  public role = new FormControl('', [Validators.required]);
  public roleKeys = Object.keys(RoleEnum).filter((k: any) => !isNaN(Number(RoleEnum[k])));
  public roleEnum: any = RoleEnum;
  public firstname = new FormControl
  public lastname = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required]);
  public age = new FormControl('', [Validators.required]);
  public profileAvatar = new FormControl('', [Validators.required]);


  matcher = new MyErrorStateMatcher();


  @Output() onSubmitEvent = new EventEmitter<UserInterface>();
  @Input() submitLabel: string | undefined;
  @Input() pageLabel: string | undefined;

  @Input() showRetypePassword = false;
  @Input() showRole = false;
  @Input() showFirstName = false;
  @Input() showLastName = false;
  @Input() showEmail = false;
  @Input() showAge = false;
  @Input() showProfileAvatar = false;

  constructor(private readonly router: Router) { }

  ngOnInit(): void { }

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
    
    if(this.router.url === '/auth/login') {
      this.onSubmitEvent.emit({
        username: this.username.value,
        password: this.password.value
      })
    }
    else {
      this.onSubmitEvent.emit({
        username: this.username.value,
        password: this.password.value,
        retypedPassword: this.retypedPassword.value,
        role: this.role.value,
        profile: {
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          email: this.email.value,
          age: this.age.value,
          profileAvatar: this.profileAvatar.value
        }
      })
    }
    
  }
}
