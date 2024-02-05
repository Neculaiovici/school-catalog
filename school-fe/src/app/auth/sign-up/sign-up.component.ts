import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/common/model/user.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public pageLabel: string = "Register page";
  public submitButtonLabel: string = "register";

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(user: UserInterface) {
    this.authService.registerUser(user).subscribe((resp) => {
      // TO DO redirect to another page or to home....
    })
  }
}
