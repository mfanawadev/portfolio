import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private baseURL: string = 'http://localhost:8080/student'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getProfile(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    return this.http.get<any>(`${this.baseURL}/get-profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  verifyPassword(body: any): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    return this.http.post<any>(`${this.baseURL}/verify-password`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  changePassword(body: any): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    return this.http.post<any>(`${this.baseURL}/change-password`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  sendOTP(body: any): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    return this.http.post<any>(`${this.baseURL}/send-otp`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  verifyOTP(body: any): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('Token not found'));
    }

    return this.http.post<any>(`${this.baseURL}/verify-otp`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.authService.clearToken();
    }
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
