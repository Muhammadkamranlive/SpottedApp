import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  constructor(private http: HttpClient) {}

  create(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data).pipe(
      timeout(600000),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  read(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      timeout(600000),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  update(url: string, data: any): Observable<any> {
    return this.http.put<any>(url, data).pipe(
      timeout(600000),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(url).pipe(
      timeout(600000),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getLang(lan: string): string {
   return "en";
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    let message: string = 'Error' +" ";
    if (error.error && error.error) {
        message += error.error;
    }
    else if (error.error && error.error.message) {
      message += error.error.message;
    } else if (error.error && error.error.title) {
      message += error.error.title;
    } else if (error.error && error.error.errors) {
      const firstErrorField = Object.keys(error.error.errors)[0];
      const firstErrorMessage = error.error.errors[firstErrorField][0];
      if (firstErrorMessage) {
        message += ': ' + firstErrorMessage;
      }
    }

    return throwError(message);
  }
}
