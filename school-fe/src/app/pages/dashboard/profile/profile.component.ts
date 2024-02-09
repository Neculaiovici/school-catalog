import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/app/enum/role.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { config } from 'process';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile$!: Observable<any>;
  public loading: boolean = true;
  public RoleEnum = RoleEnum;

  constructor(
    private readonly dashboardService: DashboardService,
    public readonly dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.profile$ = this.dashboardService.getProfile();
    // TO DO modify this spinner it's not ok
    this.profile$.subscribe({
      next: (profile) => { },
      error: (error) => { console.log(error);},
      complete: () => { this.loading = false; }
    });
  }

  getRoleName(role: number): string {
    return RoleEnum[role];
  }

  updatePassword(): void {
    const dialogRef = this.dialog.getDialogById('updatePassword');
    if (!dialogRef || !dialogRef.componentInstance) {
      this.dialog.open(DialogOverviewComponent, {
        id: 'updatePassword',
        data: {title: "Change password", shwoPassword: true}
      });
      
    }
    dialogRef?.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

  updateProfile(): void {
    const dialogRef = this.dialog.getDialogById('updateProfile');
    if (!dialogRef || !dialogRef.componentInstance) {
      this.dialog.open(DialogOverviewComponent, {
        id: 'updateProfile',
        data: {
          showFirstName: true,
          showLastName: true,
          showEmail: true,
          showAge: true,
          showProfileAvatar: true,
          title: "Update profile"
        }
      });
    }
  }
}
