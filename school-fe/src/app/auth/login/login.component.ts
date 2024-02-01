import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.services';
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

  public usernameFormControl = new FormControl('', Validators.required);
  public passwordFormControl = new FormControl('', Validators.required);

  @Output() onSubmitEvent = new EventEmitter<UserInterface>();
  @ViewChild(AuthComponent) authComponent: AuthComponent | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
    ) { }

  ngOnInit(): void { }

  public login(users:UserInterface) {
    const user: UserInterface = {
      username: this.usernameFormControl.value,
      password: this.passwordFormControl.value,
    };

    this.authService.login(user).subscribe(() => {
      // Apelează metoda onSubmit din app-auth
      if (this.authComponent) {
        this.authComponent.onSubmit(user);
      }
      this.router.navigate(['']);
    });
  }

}
