import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, catchError, of, tap } from "rxjs";
import { User } from "../common/model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'
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

  public login(user: User) {
    return this.httpClient.post<User>(`${this.apiUrl}/auth/login`, {user});
  }

  public logout() {
    this.httpClient.post(`${this.apiUrl}/auth/logout`, {}).subscribe(() => {
      this.authenticated.next(false);
      this.router.navigate(['/login']);
    });
  }

  public getUser(id: number) {
    return this.httpClient.get(`${this.apiUrl}/user/${id}`);
  }

}