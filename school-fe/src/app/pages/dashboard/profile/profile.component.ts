import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/app/enum/role.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile$!: Observable<any>;
  loading: boolean = true;
  RoleEnum = RoleEnum;

  constructor(
    private readonly dashboardService: DashboardService,
    public readonly dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.profile$ = this.dashboardService.getProfile();
    // TO DO modify this spinner it's not ok
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent);
  }

}
