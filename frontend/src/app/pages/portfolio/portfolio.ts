import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class PortfolioComponent {
  private authService = inject(AuthService);

  get estConnecte(): boolean {
    return this.authService.isLoggedIn();
  }

  nomComplet = 'Tony Mourrah';
  titre = 'Étudiant en génie logiciel — ÉTS';
  githubUrl = 'https://github.com/TonyMourrah';
  linkedinUrl = 'https://www.linkedin.com/in/tony-mourrah-b819551b2/';
  email = 'tony.mourrah.1@ens.etsmtl.ca';

  technologies = [
    { nom: 'Angular', icone: 'bi-code-slash' },
    { nom: '.NET / C#', icone: 'bi-server' },
    { nom: 'Entity Framework Core', icone: 'bi-database' },
    { nom: 'Azure SQL Database', icone: 'bi-cloud' },
    { nom: 'Azure Blob Storage', icone: 'bi-hdd-network' },
    { nom: 'JWT / BCrypt', icone: 'bi-shield-lock' },
    { nom: 'GitHub Actions (CI/CD)', icone: 'bi-gear-wide-connected' },
    { nom: 'xUnit', icone: 'bi-check2-square' },
    { nom: 'Leaflet / OpenStreetMap', icone: 'bi-geo-alt' },
    { nom: 'Chart.js', icone: 'bi-graph-up' }
  ];

  fonctionnalites = [
    'Authentification JWT sécurisée avec rôles (Admin / Inspecteur)',
    'Gestion complète (CRUD) des actifs routiers — ponts, viaducs, tunnels',
    'Traçabilité complète : historique horodaté de chaque modification',
    'Géolocalisation automatique avec carte interactive (Leaflet)',
    'Galerie de photos par actif (Azure Blob Storage)',
    'Graphique d\'évolution de l\'indice de santé dans le temps',
    'Espace Admin avec statistiques globales et gestion des rôles',
    'Mots de passe sécurisés par hachage cryptographique (BCrypt)',
    'Tests automatisés (xUnit) intégrés au pipeline CI/CD',
    'Déploiement cloud complet sur Azure avec pipeline CI/CD automatisé'
  ];
}