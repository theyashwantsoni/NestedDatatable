import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const httpOptions = {
	headers: new HttpHeaders({
	  'Content-Type':  'application/json',
	  'Accept': 'application/json',
	  "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT",
	  'Access-Control-Allow-Origin': 'http://localhost:4200'
	})
  };


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/';  // URL to web api

  constructor(private http: HttpClient) { }

  anyservice (data:any,uri:string): Observable<any> {
	let target = this.baseUrl + uri ;
    return this.http.post<any>(target, data, httpOptions)
      .pipe(
        map((res: any) => {
          return res;
          }),
          catchError(err => {
			  console.log(err)
          return this.handleError;
          })
      );
  }
  private handleError(error: HttpErrorResponse) {
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
    return error.status;
  };
}
