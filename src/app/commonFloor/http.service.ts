import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions: any = {
    headers: new HttpHeaders({
      // "USER_KEY", "QIF83Fjoe4sYxdQsah3h")    
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin':'*'
      // 'Content-Type':'application/x-www-form-urlencoded'
    })
  }
  constructor(private http: HttpClient) { }
  BASE_URL: string = 'http://192.168.0.161:8100/api/'; //'https://www.onewaycabindia.in/api/';
  getHeader(body: any) {
    return {
      Header: {
        serviceName: ''
      },
      Record: body
    }
  }

  FrameRequest(record: {}): {} {
    return {
      static: {
        mode: 'Admin',
        deviceId: 'mydevice001'
      },
      record
    }
  }

  invokeRequest(req: any, path: string): Observable<any> {
    // const requestObj = this.getHeader(req);
	try{
		JSON.stringify(req)
	}catch(e){
		req ={};
	}
     const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post(this.BASE_URL + path,JSON.stringify(req),config);
  }

  // Handle API errors  
  handleError(error: HttpErrorResponse) {
    console.log('EROOR', error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
