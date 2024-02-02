import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.services';
import { Router } from '@angular/router';
import { User } from 'src/app/common/model/user';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public pageLabel: string = "Login page";
  public submitButtonLabel: string = "Login";

  @Output() onSubmitEvent = new EventEmitter<User>();
  @ViewChild(AuthComponent) authComponent: AuthComponent | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
    ) { }

  ngOnInit(): void { }

  login(user: User) {
    this.authService.login(user).subscribe(() => {
      this.router.navigate([''])
    })
  }

}
