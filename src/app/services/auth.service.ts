import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseURL: string = 'http://localhost:8080/auth'

  constructor(private httpClient: HttpClient) { }

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedIn.asObservable();


  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }


  login(body: any){
    return this.httpClient.post<any>(`${this.baseURL}/login`, body)
  }

  register( body: any){
    return this.httpClient.post<any>(`${this.baseURL}/register`, body)
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token)
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken')
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('studentNumber')
    localStorage.removeItem('email')
    this.loggedIn.next(false);
  }

}
