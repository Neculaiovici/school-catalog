import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, catchError, of, tap, throwError } from "rxjs";
import { UserInterface } from "../model/user.interface";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { LoginResponseInterface } from "../model/login-response.interface";
import { AppConfig } from "src/config/config";

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
export class AuthService {

  private apiUrl:string = AppConfig.apiUrl;
  private readonly authenticated = new Subject<boolean>();
  public authenticated$ = this.authenticated.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
    ) {}

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.apiUrl}/auth`).pipe(
      tap(() => {
        this.authenticated.next(true);
      }),
      catchError(e => {
        of(false);
        return throwError(e.error.message);
      })
    );
  }

  public login(user: UserInterface): Observable<LoginResponseInterface> {
    return this.httpClient.post<LoginResponseInterface>(`${this.apiUrl}/auth/login`, user).pipe(
      tap(() => this.snackbar.open('Login successfull!', 'Close', snackBarSuccessConfig)),
      catchError(e => {
        this.snackbar.open(`${e.error.message} for username "${user.username}"`, 'Close', snackBarErrorConfig);
        return throwError(e);
      }) 
    )
  }

  public logout() {
    this.httpClient.post(`${this.apiUrl}/auth/logout`, {})
    .pipe(
      tap(() => this.snackbar.open('Logout successfull!', 'Close', snackBarSuccessConfig))
    )
    .subscribe(() => {
      this.authenticated.next(false);
      this.router.navigate(['/home']);
    });
  }

  public registerUser(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(`${this.apiUrl}/user`, user).pipe(
      tap(() => this.snackbar.open(`Username: ${user.username} was created!`, 'Close', snackBarSuccessConfig)),
      catchError(e => {
        this.snackbar.open(`Error message create user: ${e.error.message}`, 'Close', snackBarErrorConfig);
        return throwError(e);
      })
    );
  }
  
}