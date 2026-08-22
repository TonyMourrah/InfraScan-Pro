import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './a-propos.html',
  styleUrl: './a-propos.scss'
})
export class AProposComponent {
  etapes = [
    {
      icone: 'bi-person-plus',
      titre: '1. Créer un compte',
      description: 'Inscris-toi avec un identifiant, un courriel et un mot de passe sécurisé. Une fois connecté, tu arrives sur ton tableau de bord.'
    },
    {
      icone: 'bi-speedometer2',
      titre: '2. Explorer le tableau de bord',
      description: 'Vois d\'un coup d\'œil le nombre total d\'actifs, la santé moyenne et les urgences. Recherche ou trie la liste par nom ou par priorité.'
    },
    {
      icone: 'bi-plus-circle',
      titre: '3. Créer un nouvel actif',
      description: 'Clique sur "Nouvel actif", remplis le nom, le type, la ville et la date d\'inspection. Utilise le bouton de géolocalisation pour situer automatiquement l\'actif sur la carte.'
    },
    {
      icone: 'bi-camera',
      titre: '4. Ajouter une photo',
      description: 'Dans le formulaire de création ou de modification, choisis une image (JPG, PNG ou WEBP, max 5 MB) pour documenter visuellement l\'état de l\'actif.'
    },
    {
      icone: 'bi-graph-up',
      titre: '5. Suivre l\'évolution',
      description: 'Chaque modification de l\'indice de santé est enregistrée. Consulte la page détail d\'un actif pour voir le graphique d\'évolution et le journal complet des inspections.'
    },
    {
      icone: 'bi-file-earmark-excel',
      titre: '6. Exporter tes données',
      description: 'Clique sur "Exporter" pour télécharger un rapport CSV de tous tes actifs — utile pour des présentations ou des analyses externes.'
    },
    {
      icone: 'bi-gear',
      titre: '7. Gérer ton compte',
      description: 'Dans "Paramètres", consulte tes informations et change ton mot de passe en tout temps.'
    }
  ];
}