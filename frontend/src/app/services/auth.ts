import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly API_URL = `${environment.apiUrl}/auth`;
  private readonly USER_URL = `${environment.apiUrl}/utilisateurs`;

  login(credentials: any) {
    return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/actifs']);
      })
    );
  }

  getUsername(): string {
    return localStorage.getItem('username') || 'Invité';
  }

  getRole(): string {
    return localStorage.getItem('role') || 'Inspecteur';
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['/']);
  }

  register(user: any) {
    return this.http.post<any>(`${this.API_URL}/register`, user);
  }

  getMoi() {
    return this.http.get<{ username: string; email: string; role: string }>(`${this.USER_URL}/moi`);
  }

  changerMotDePasse(payload: { ancienMotDePasse: string; nouveauMotDePasse: string }) {
    return this.http.put<{ message: string }>(`${this.USER_URL}/moi/mot-de-passe`, payload);
  }
}