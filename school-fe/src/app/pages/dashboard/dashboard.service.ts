import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/model/user.interface';
import { AppConfig } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly url: string = AppConfig.apiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  public getProfile(): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(`${this.url}/user/profile`)
  }

  public updatePassword(password: string): Observable<UserInterface> {
    return this.httpClient.patch<UserInterface>(`${this.url}/user/change-password`, password);
  }

}
