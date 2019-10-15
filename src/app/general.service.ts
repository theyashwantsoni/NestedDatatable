import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private baseUrl = 'api/data';  // URL to web api

  constructor(private http: HttpClient) { }

    getData (): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl)
        .pipe(
          catchError(this.handleError('getData', []))
        );
    }
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
          // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
