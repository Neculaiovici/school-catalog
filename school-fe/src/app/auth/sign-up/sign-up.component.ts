import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/common/model/user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public pageLabel: string = "Register page";
  public submitButtonLabel: string = "register";

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
  }

  registerUser(user: UserInterface) {
    this.authService.registerUser(user).subscribe(() => {
      this.router.navigate(['home'])
      // TO DO redirect to another page or to home....
    })
  }
}
