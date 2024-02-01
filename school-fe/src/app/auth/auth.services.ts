import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, catchError, of, tap } from "rxjs";
import { UserInterface } from "../common/model/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3200/auth'
  private readonly authenticated = new Subject<boolean>();
  private authenticated$ = this.authenticated.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
    ) {}

  isAuthenticated() {
    return this.httpClient.get<boolean>(this.apiUrl).pipe(
      tap(() => {
        this.authenticated.next(true);
      }),
      catchError(() => of(false))
    );
  }

  public login(user: UserInterface) {
    return this.httpClient.post<UserInterface>(`${this.apiUrl}/login`, user);
  }

  public logout() {
    this.httpClient.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
      this.authenticated.next(false);
      this.router.navigate(['/login']);
    });
  }

}