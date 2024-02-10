import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private updateProfileSubject = new Subject<void>();
  updateProfile$ = this.updateProfileSubject.asObservable();

  triggerUpdateProfileComponent() {
    this.updateProfileSubject.next()
  }
}