import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/common/model/user.interface';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public pageLabel: string = "Login page";
  public submitButtonLabel: string = "Login";

  @Output() onSubmitEvent = new EventEmitter<UserInterface>();
  @ViewChild(AuthComponent) authComponent: AuthComponent | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
    ) { }

  ngOnInit(): void { }

  login(user: UserInterface) {
    this.authService.login(user).subscribe(() => {
      this.router.navigate(['home'])
    })
  }

}
