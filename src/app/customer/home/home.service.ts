import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../commonFloor/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpService
  ) { }
  confirmBooking(formData): Observable<any> {
    const _Request = this.http.FrameRequest(formData);
    return this.http.invokeRequest(_Request, 'newtrips/booking')
  }
}
