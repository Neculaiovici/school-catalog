import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/app/enum/role.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile$!: Observable<any>;
  loading: boolean = true;
  RoleEnum = RoleEnum;

  constructor(private readonly dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.profile$ = this.dashboardService.getProfile();
    this.profile$.subscribe({
      next: (profile) => {
        console.log(profile)
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  getRoleName(role: number): string {
    return RoleEnum[role];
  }

}
