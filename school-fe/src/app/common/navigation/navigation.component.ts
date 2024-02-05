import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private readonly authService: AuthService) { 
    this.isLoggedIn$ = authService.authenticated$;
  }

  ngOnInit(): void { }

  onLogout() {
    this.authService.logout();
  }

}
