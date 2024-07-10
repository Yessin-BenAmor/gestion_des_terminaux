import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Assuming your API endpoint is different

  constructor(private http: HttpClient) { }

  signup(lastName: string,name: string, teamId: string,  password: string): Observable<any> {
    const body = { lastName, teamId, name, password };
    return this.http.post<any>(`${this.apiUrl}/SignUp`, body).pipe(
      tap(data => {
        // Handle response if needed
        console.log('Signup successful:', data);
      })
    );
  }

  signin(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/SignIn`, body).pipe(
      tap(data => {
        // Save token to localStorage or session storage
        localStorage.setItem('token', data.token);
      })
    );
  }

  signout(): void {
    // Remove token from localStorage or session storage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if token exists in localStorage or session storage
    return !!localStorage.getItem('token');
  }
}
