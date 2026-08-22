import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.html'
})
export class SettingsComponent implements OnInit {
  username = '';
  email = '';
  role = '';
  loading = true;

  ancienMotDePasse = '';
  nouveauMotDePasse = '';
  confirmationMotDePasse = '';
  isSaving = false;
  messageSucces = '';
  messageErreur = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getMoi().subscribe({
      next: (data) => {
        this.username = data.username;
        this.email = data.email;
        this.role = data.role;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  get critereLongueur(): boolean { return this.nouveauMotDePasse.length >= 8; }
  get critereMajuscule(): boolean { return /[A-Z]/.test(this.nouveauMotDePasse); }
  get critereMinuscule(): boolean { return /[a-z]/.test(this.nouveauMotDePasse); }
  get critereChiffre(): boolean { return /[0-9]/.test(this.nouveauMotDePasse); }
  get critereSpecial(): boolean { return /[\W_]/.test(this.nouveauMotDePasse); }
  get motDePasseValide(): boolean {
    return this.critereLongueur && this.critereMajuscule && this.critereMinuscule && this.critereChiffre && this.critereSpecial;
  }

  changerMotDePasse(): void {
    this.messageSucces = '';
    this.messageErreur = '';

    if (!this.motDePasseValide) {
      this.messageErreur = "Le nouveau mot de passe ne respecte pas les critères.";
      return;
    }
    if (this.nouveauMotDePasse !== this.confirmationMotDePasse) {
      this.messageErreur = "La confirmation ne correspond pas au nouveau mot de passe.";
      return;
    }

    this.isSaving = true;
    this.authService.changerMotDePasse({
      ancienMotDePasse: this.ancienMotDePasse,
      nouveauMotDePasse: this.nouveauMotDePasse
    }).subscribe({
      next: (res) => {
        this.messageSucces = res.message;
        this.ancienMotDePasse = '';
        this.nouveauMotDePasse = '';
        this.confirmationMotDePasse = '';
        this.isSaving = false;
      },
      error: (err) => {
        this.messageErreur = err.error?.message || "Erreur lors du changement de mot de passe.";
        this.isSaving = false;
      }
    });
  }
}