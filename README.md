# InfraScan Pro

Application de gestion d'infrastructures routières — suis l'état de santé de ponts, viaducs et tunnels en temps réel, avec géolocalisation, historique complet et gestion des rôles.

**🔗 Démo en ligne :** [wonderful-sky-060e2540f.7.azurestaticapps.net](https://wonderful-sky-060e2540f.7.azurestaticapps.net/)

---

## À propos du projet

InfraScan Pro est né d'une réflexion simple : plusieurs organisations qui gèrent des infrastructures physiques n'ont pas toujours accès à des outils de suivi modernes, souvent parce que ces solutions sont trop coûteuses ou trop complexes pour leurs besoins réels. Le projet couvre un cycle de développement full-stack complet : authentification sécurisée par rôles, gestion complète des actifs, géolocalisation, traçabilité historique, panneau d'administration, suite de tests automatisés, et déploiement cloud entièrement automatisé sur Azure via un pipeline CI/CD.

## Fonctionnalités

- 🔐 Authentification sécurisée avec JWT et rôles utilisateur (Admin / Inspecteur)
- 🔒 Mots de passe hashés avec BCrypt et validation de complexité (majuscule, minuscule, chiffre, caractère spécial)
- 📩 Champ courriel associé à chaque profil utilisateur
- ⚙️ Page Paramètres : consultation du profil et changement de mot de passe
- 🧑‍💼 Panneau d'administration : statistiques globales et gestion des rôles, sans exposer les données sensibles des utilisateurs
- 🏗️ Gestion complète (CRUD) des actifs routiers — ponts, viaducs, tunnels
- 🧾 Historique complet et horodaté de chaque création et modification, par utilisateur
- 📍 Géolocalisation automatique en cascade (nom précis → ville → position par défaut) via l'API Nominatim, affichée sur une carte interactive (Leaflet / OpenStreetMap)
- 📷 Galerie de photos par actif, hébergées sur Azure Blob Storage
- 📊 Graphique d'évolution de l'indice de santé dans le temps (Chart.js), basé sur l'historique réel des inspections
- 📤 Export CSV des données pour rapports
- 📖 Page tutoriel intégrée pour guider les nouveaux utilisateurs
- 🧪 Suite de tests automatisés (xUnit) intégrée au pipeline CI/CD
- ☁️ Déploiement cloud complet sur Azure (backend, base de données, stockage, frontend)
- ⚙️ Pipelines CI/CD automatisés avec GitHub Actions, tests bloquant le déploiement en cas d'échec

## Stack technique

**Backend**
- C#, .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server (développement local) / Azure SQL Database (production)
- JWT (Microsoft.AspNetCore.Authentication.JwtBearer), BCrypt.Net
- Azure.Storage.Blobs
- xUnit, Microsoft.AspNetCore.Mvc.Testing

**Frontend**
- Angular, TypeScript
- Bootstrap 5, Bootstrap Icons
- Leaflet / OpenStreetMap
- Chart.js

**Infrastructure & DevOps**
- Azure App Service (backend)
- Azure SQL Database
- Azure Blob Storage
- Azure Static Web Apps (frontend)
- GitHub Actions (CI/CD, tests automatisés bloquant le déploiement)

## Architecture

```
InfraScan/
├── backend/
│   ├── Controllers/        # Actifs, Auth, Utilisateurs, Admin
│   ├── Models/               # Entités, DTOs
│   ├── Services/              # BlobService (Azure Storage)
│   ├── Helpers/                 # MotDePasseValidator
│   ├── Data/                     # AppDbContext (EF Core)
│   ├── Migrations/
│   └── InfraScan.Tests/          # Tests xUnit (unitaires + intégration)
├── frontend/
│   └── src/app/
│       ├── components/         # Login, Signup, ActifList, ActifDetail
│       ├── pages/                # Accueil, À propos (tutoriel), Portfolio, Settings, Admin
│       ├── services/               # Actif, Auth, Admin, Geocoding
│       ├── guard/                    # AuthGuard, AdminGuard
│       └── interceptors/               # AuthInterceptor (JWT)
└── .github/workflows/         # Pipelines CI/CD (backend + frontend)
```

## Sécurité

- Authentification stateless par JWT, avec expiration automatique des tokens
- Endpoints protégés via `[Authorize]`, et `[Authorize(Roles = "Admin")]` pour l'espace d'administration
- Mots de passe hashés avec BCrypt, jamais stockés en clair, avec validation de complexité obligatoire
- Le panneau d'administration n'expose que l'identifiant et le rôle des utilisateurs — jamais le courriel ni le mot de passe
- Aucun secret (clé JWT, connection strings) stocké en dur dans le code — tout passe par les variables d'environnement de l'App Service en production

## Lancer le projet en local

### Prérequis
- .NET 10 SDK
- Node.js 18+
- SQL Server (ou SQL Server Express)

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

L'API démarre sur `https://localhost:7xxx` (port affiché dans le terminal). Un fichier `appsettings.Development.json` local (non commité) doit contenir la connection string SQL Server, la connection string Azure Storage et la clé secrète JWT.

### Frontend

```bash
cd frontend
npm install
ng serve
```

L'application démarre sur `http://localhost:4200`.

### Lancer les tests

```bash
cd backend/InfraScan.Tests
dotnet test
```

## Déploiement

Le projet est déployé automatiquement à chaque push sur `main`, via deux pipelines distincts :
- Le **backend** est buildé, testé (xUnit), puis déployé sur **Azure App Service**
- Le **frontend** est buildé et déployé sur **Azure Static Web Apps**

Si un seul test échoue, le déploiement du backend est automatiquement bloqué.

---

## Auteur

**Tony Mourrah** — Étudiant en génie logiciel, ÉTS

- [GitHub](https://github.com/TonyMourrah)
- [LinkedIn](https://www.linkedin.com/in/tony-mourrah-b819551b2/)
- tony.mourrah.1@ens.etsmtl.ca
