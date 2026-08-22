import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { ActifListComponent } from './components/actif-list/actif-list';
import { ActifDetailComponent } from './components/actif-detail/actif-detail';
import { authGuard } from './guard/auth';
import { adminGuard } from './guard/admin';
import { AProposComponent } from './pages/a-propos/a-propos';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { AccueilComponent } from './pages/accueil/accueil';
import { SettingsComponent } from './pages/settings/settings';
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'actifs', component: ActifListComponent, canActivate: [authGuard] },
  { path: 'actifs/:id', component: ActifDetailComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard, adminGuard] },
  { path: '**', redirectTo: '' }
];