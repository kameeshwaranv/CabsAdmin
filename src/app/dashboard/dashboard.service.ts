
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, ObservedValueOf, of, Subject } from 'rxjs';
import { HttpService } from '../commonFloor/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService implements Resolve<any>{
  _NewTrip: Subject<any>;
  _CompletedTrip: Subject<any>;
  constructor(
    private http: HttpService
  ) {
    this._NewTrip = new Subject();
    this._CompletedTrip = new Subject();
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const _NewTrips = this.getNewTrip();
    const _CompletedTrips = this.getCompletedTrip();
    const _PaymentInfo = this.getPaymentDetail();
    return forkJoin([
      _NewTrips,
      _CompletedTrips,
      _PaymentInfo
    ])
  }

  getNewTrip(): Observable<any> {
    const _Request = this.http.FrameRequest({ limit: 0, lastId: 'Admin', channel: 'App' });
    return this.http.invokeRequest(_Request, 'newtrips/fetchNewTrips')
  }

  getCompletedTrip(): Observable<any> {
    const _Request = this.http.FrameRequest({ limit: 0, lastId: 'Admin' });
    return this.http.invokeRequest(_Request, 'completedtrips/getCompletedTrips')
  }

  addNewPaymentDetail(request: {}): Observable<any> {
    const _Request = this.http.FrameRequest(request);
    return this.http.invokeRequest(_Request, 'paymentInfo/AddPaymentInfo')
  }

  getPaymentDetail(): Observable<any> {
    const _Request = this.http.FrameRequest({ limit: 0, lastId: 'Admin' });
    return this.http.invokeRequest(_Request, 'paymentInfo/getPaymentInfo')
  }

  /**** New Trip to ACtivate state */
  moveToActivate(request: any): Observable<any> {
    const _Request = this.http.FrameRequest(request);
    return this.http.invokeRequest(_Request, 'newtrips/moveToActive')
  }
  /***Search Trip ID */
  getOrderedList(request: any): Observable<any> {
    const _Request = this.http.FrameRequest(request);
    return this.http.invokeRequest(_Request, 'orderTrip/searchOrderedTrip')
  }
  checkProfileInfo(request: any): Observable<any> {
    const _Request = this.http.FrameRequest(request);
    return this.http.invokeRequest(_Request, 'orderTrip/checkProfileEligibility')
  }

  confirmbooking(request: any): Observable<any> {
    const _Request = this.http.FrameRequest(request)
    return this.http.invokeRequest(_Request, 'completedtrips/finalBooking');
  }

}
