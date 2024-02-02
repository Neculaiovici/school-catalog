import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'school-fe';
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser(1).subscribe((resp) => {console.log(resp)})
  }
}
