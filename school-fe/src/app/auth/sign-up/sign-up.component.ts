import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/model/user';
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

  registerUser(user: User) {
    // this.authService.login(user).subscribe(() => {
    //   this.router.navigate([''])
    // })

    this.authService.registerUser(user).subscribe((resp) => {
      console.log(resp);
    })
  }
}
