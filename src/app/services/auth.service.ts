import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  signup(username: string, id_team: string,  password: string): Observable<any> {
    const body = { username, id_team, password };
    return this.http.post<any>(`${this.apiUrl}/signUp`, body).pipe(
      tap(data => {
        console.log('Signup successful:', data);
      })
    );
  }

  signin(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/signIn`, body).pipe(
      tap(data => {
        // Save token f localStorage 
        localStorage.setItem('token', data.token);
      })
    );
  }

  signout(): void {
    // Remove token ml localStorage  
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if token exists  
    return !!localStorage.getItem('token');
  }
}
