import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService, StatsAdmin, UtilisateurGestion } from '../../services/admin';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.html'
})
export class AdminComponent implements OnInit {
  stats: StatsAdmin | null = null;
  utilisateurs: UtilisateurGestion[] = [];
  loading = true;
  isSavingId: number | null = null;
  rolesDisponibles = ['Inspecteur', 'Admin'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe(s => this.stats = s);
    this.adminService.getUtilisateurs().subscribe({
      next: (u) => { this.utilisateurs = u; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  changerRole(utilisateur: UtilisateurGestion, nouveauRole: string): void {
    if (utilisateur.role === nouveauRole) return;
    this.isSavingId = utilisateur.id;
    this.adminService.changerRole(utilisateur.id, nouveauRole).subscribe({
      next: () => {
        utilisateur.role = nouveauRole;
        this.isSavingId = null;
      },
      error: () => {
        alert("Erreur lors du changement de rôle.");
        this.isSavingId = null;
      }
    });
  }
}