import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-a-propos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './a-propos.html',
  styleUrl: './a-propos.scss',
})
export class AProposComponent {
  etapes = [
    {
      icone: 'bi-person-plus',
      titre: '1. Créer un compte',
      description:
        'Inscris-toi avec un identifiant, un courriel et un mot de passe sécurisé. Une fois connecté, tu arrives sur ton tableau de bord.',
    },
    {
      icone: 'bi-speedometer2',
      titre: '2. Explorer le tableau de bord',
      description:
        "Vois d'un coup d'œil le nombre total d'actifs, la santé moyenne et les urgences. Recherche ou trie la liste par nom ou par priorité.",
    },
    {
      icone: 'bi-plus-circle',
      titre: '3. Créer un nouvel actif',
      description:
        'Clique sur "Nouvel actif", remplis le nom, le type, la ville et la date d\'inspection. Utilise le bouton de géolocalisation pour situer automatiquement l\'actif sur la carte.',
    },
    {
      icone: 'bi-camera',
      titre: '4. Ajouter une photo',
      description:
        "Dans le formulaire de création ou de modification, choisis une image (JPG, PNG ou WEBP, max 5 MB) pour documenter visuellement l'état de l'actif.",
    },
    {
      icone: 'bi-graph-up',
      titre: "5. Suivre l'évolution",
      description:
        "Chaque modification de l'indice de santé est enregistrée. Consulte la page détail d'un actif pour voir le graphique d'évolution et le journal complet des inspections.",
    },
    {
      icone: 'bi-file-earmark-excel',
      titre: '6. Exporter tes données',
      description:
        'Clique sur "Exporter" pour télécharger un rapport CSV de tous tes actifs — utile pour des présentations ou des analyses externes.',
    },
    {
      icone: 'bi-gear',
      titre: '7. Gérer ton compte',
      description:
        'Dans "Paramètres", consulte tes informations et change ton mot de passe en tout temps.',
    },
  ];
  faqs = [
    {
      question: "Est-ce que mes données sont partagées avec d'autres utilisateurs ?",
      reponse:
        'Non, chaque compte est indépendant. Seuls les administrateurs voient des statistiques globales, jamais les données personnelles des autres comptes.',
    },
    {
      question: 'Quels formats de photos sont acceptés ?',
      reponse:
        "JPG, PNG et WEBP, jusqu'à 5 MB par image. Une seule photo par actif à la fois — une nouvelle photo remplace l'ancienne.",
    },
    {
      question: 'Comment fonctionne la géolocalisation automatique ?',
      reponse:
        "En cliquant sur le bouton de localisation, l'application cherche d'abord le nom précis de l'actif avec la ville, puis retombe sur la ville seule si rien n'est trouvé, et enfin sur une position par défaut en dernier recours.",
    },
    {
      question: 'Est-ce que je peux changer mon mot de passe ?',
      reponse: 'Oui, dans la page Paramètres, accessible depuis le tableau de bord.',
    },
    {
      question: "Qui peut accéder à l'espace Admin ?",
      reponse:
        'Seuls les comptes ayant le rôle Admin voient ce lien apparaître dans la navigation et peuvent y accéder.',
    },
    {
      question: 'Le projet est-il open source ?',
      reponse: 'Le code est disponible sur GitHub — plus de détails sur la page Portfolio.',
    },
  ];
}
