import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ProfileInterface } from 'src/app/model/profile.interface';
import { UserInterface } from 'src/app/model/user.interface';
import { AppConfig } from 'src/config/config';

export const snackBarSuccessConfig: MatSnackBarConfig = {
  duration: 5500,
  horizontalPosition: "center",
  verticalPosition: "bottom",
  panelClass: ['succsess-snackbar']
}

export const snackBarErrorConfig: MatSnackBarConfig = {
  duration: 5500,
  horizontalPosition: "center",
  verticalPosition: "bottom",
  panelClass: ['error-snackbar']
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly url: string = AppConfig.apiUrl;

  constructor(private readonly httpClient: HttpClient, private readonly snackbar: MatSnackBar) { }

  public getProfile(): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(`${this.url}/user/profile`)
  }

  public updatePassword(password: string): Observable<UserInterface> {
    return this.httpClient.patch<UserInterface>(`${this.url}/user/change-password`, password).pipe(
      tap(() => this.snackbar.open('Password change successfull!', 'Close', snackBarSuccessConfig)),
      catchError(e => {
        this.snackbar.open(`Password not changed, error message: ${e.error.message}`, 'Close', snackBarErrorConfig);
        return throwError(e);
      }) 
    );
  }

  public updateProfile(profile: ProfileInterface): Observable<ProfileInterface>{
    return this.httpClient.patch<ProfileInterface>(`${this.url}/profile/update`, profile).pipe(
      tap(() => this.snackbar.open('Profile updated successfull!', 'Close', snackBarSuccessConfig)),
      catchError(e => {
        this.snackbar.open(`Profile not changed, error message: ${e.error.message}`, 'Close', snackBarErrorConfig);
        return throwError(e);
      })
    );
  }

}
