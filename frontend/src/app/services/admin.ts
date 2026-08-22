import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

export interface StatsAdmin {
  totalActifs: number;
  totalUtilisateurs: number;
  santeMoyenne: number;
  urgences: number;
  totalModifications: number;
  repartitionRoles: { role: string; nombre: number }[];
}

export interface UtilisateurGestion {
  id: number;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<StatsAdmin>(`${this.apiUrl}/stats`);
  }

  getUtilisateurs() {
    return this.http.get<UtilisateurGestion[]>(`${this.apiUrl}/utilisateurs`);
  }

  changerRole(id: number, nouveauRole: string) {
    return this.http.put<{ message: string }>(`${this.apiUrl}/utilisateurs/${id}/role`, { nouveauRole });
  }
}