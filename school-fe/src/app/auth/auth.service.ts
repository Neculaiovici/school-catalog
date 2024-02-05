import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, catchError, of, tap, throwError } from "rxjs";
import { UserInterface } from "../common/model/user.interface";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { LoginResponseInterface } from "../common/model/login-response.interface";

export const snackBarConfig: MatSnackBarConfig = {
  duration: 5500,
  horizontalPosition: "center",
  verticalPosition: "bottom",
  panelClass: ['blue-snackbar']
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'
  private readonly authenticated = new Subject<boolean>();
  public authenticated$ = this.authenticated.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
    ) {}

  isAuthenticated() {
    return this.httpClient.get<boolean>(this.apiUrl).pipe(
      tap(() => {
        this.authenticated.next(true);
      }),
      catchError(() => of(false))
    );
  }

  public login(user: UserInterface): Observable<LoginResponseInterface> {
    return this.httpClient.post<LoginResponseInterface>(`${this.apiUrl}/auth/login`, user).pipe(
      tap(() => this.snackbar.open('Login successfull', 'Close', snackBarConfig)),
      catchError(e => {
        this.snackbar.open(`${e.error.message} for username "${user.username}"`, 'Close', snackBarConfig);
        return throwError(e);
      }) 
    )
  }

  public logout() {
    this.httpClient.post(`${this.apiUrl}/auth/logout`, {}).subscribe(() => {
      this.authenticated.next(false);
      this.router.navigate(['/login']);
    });
  }

  public registerUser(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(`${this.apiUrl}/user`, user).pipe(
      tap(() => this.snackbar.open(`Username: ${user.username} was created!`, 'Close', snackBarConfig)),
      catchError(e => {
        this.snackbar.open(`Error message create user: ${e.error.message}`, 'Close', snackBarConfig);
        return throwError(e);
      })
    );
  }

  public getUser(id: number) {
    return this.httpClient.get(`${this.apiUrl}/user/${id}`);
  }

}