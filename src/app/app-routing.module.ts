import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

/** importation des composants */

import { LoginComponent } from './components/admin/login/login.component';
import { AdminHomeComponent } from './components/admin/home/admin-home.component';
import { SiteHomeComponent } from './components/site/site-home/site-home.component';
import { SiteProfilComponent } from './components/site/site-profil/site-profil.component';
import { SiteTransactionsComponent } from './components/site/site-transactions/site-transactions.component';
import { PublicitesComponent } from './components/admin/publicites/publicites.component';

/** importation des guardes pour securiser des url */

import { AuthGuard } from './guards/admin/auth.guard';
import { IsConnectGuard } from './guards/admin/is-connect.guard';
import { IsAdminGuard } from './guards/admin/is-admin.guard';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { UsersComponent } from './components/admin/users/users.component';
import { PaysComponent } from './components/admin/pays/pays.component';
import { DevisesComponent } from './components/admin/devises/devises.component';
import { TransactionsComponent } from './components/admin/transactions/transactions.component';
import { SiteLoginComponent } from './components/site/site-login/site-login.component';
import { SiteAuthGuard } from './guards/site/site-auth.guard';
import { IsClientGuard } from './guards/site/is-client.guard';
import { isClientConnect } from './guards/site/is-client-connect.guard';
import { ForgotComponent } from './components/site/forgot/forgot.component';
import { ResetComponent } from './components/site/reset/reset.component';
import { RegisterComponent } from './components/site/register/register.component';
import { InfosComponent } from './components/site/infos/infos.component';
import { KycComponent } from './components/site/kyc/kyc.component';
import { CurrentransComponent } from './components/admin/currentrans/currentrans.component';
import { TodaytransComponent } from './components/admin/todaytrans/todaytrans.component';
import { OperatorComponent } from './components/admin/operator/operator.component';
import { ListransacComponent } from './components/site/listransac/listransac.component';
import { DetailsTransComponent } from './components/site/details-trans/details-trans.component';
import { TransCompteRdcComponent } from './components/site/trans-compte-rdc/trans-compte-rdc.component';
import { TransCompteGabonComponent } from './components/site/trans-compte-gabon/trans-compte-gabon.component';
import { TauxComponent } from './components/admin/taux/taux.component';
import { TarifComponent } from './components/admin/tarif/tarif.component';
// import { OfflineComponent } from './components/globale/offline/offline.component';
import { RechargeComponent } from './components/site/recharge/recharge.component';
import { TransacInternationalComponent } from './components/site/transac-international/transac-international.component';
import { RetraitComponent } from './components/site/retrait/retrait.component';

const routes: Routes = [
  /** Les routes de la partie cliente */

  { path: '', redirectTo: 'site/login', pathMatch: 'full' },
  {
    path: 'site/login',
    canActivate: [isClientConnect],
    component: SiteLoginComponent,
  },
  {
    path: 'site/forgot',
    canActivate: [isClientConnect],
    component: ForgotComponent,
  },
  {
    path: 'site/reset',
    canActivate: [isClientConnect],
    component: ResetComponent,
  },
  {
    path: 'site/register',
    canActivate: [isClientConnect],
    component: RegisterComponent,
  },
  {
    path: 'site/home',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: SiteHomeComponent,
  },
  {
    path: 'site/envoie_compte/rdc',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: TransCompteRdcComponent,
  },
  {
    path: 'site/envoie_compte/gab',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: TransCompteGabonComponent,
  },
  {
    path: 'site/transfert/international',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: TransacInternationalComponent,
  },
  {
    path: 'site/recharge',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: RechargeComponent,
  },
  {
    path: 'site/retrait',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: RetraitComponent,
  },
  {
    path: 'site/profil',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: SiteProfilComponent,
  },
  {
    path: 'site/infos',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: InfosComponent,
  },
  {
    path: 'site/transactions',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: SiteTransactionsComponent,
  },
  {
    path: 'site/transactions/detail/:id',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: DetailsTransComponent,
  },
  {
    path: 'site/listrans',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: ListransacComponent,
  },
  {
    path: 'site/kyc',
    canActivate: [SiteAuthGuard, IsClientGuard],
    component: KycComponent,
  },

  /** Les routes de la partie administration */

  {
    path: 'admin/login',
    canActivate: [IsConnectGuard],
    component: LoginComponent,
  },
  {
    path: 'admin/home',
    canActivate: [AuthGuard, IsAdminGuard],
    component: AdminHomeComponent,
  },
  {
    path: 'admin/admins',
    canActivate: [AuthGuard, IsAdminGuard],
    component: AdminsComponent,
  },
  {
    path: 'admin/pub',
    canActivate: [AuthGuard, IsAdminGuard],
    component: PublicitesComponent,
  },
  {
    path: 'admin/users',
    canActivate: [AuthGuard, IsAdminGuard],
    component: UsersComponent,
  },
  {
    path: 'admin/devise',
    canActivate: [AuthGuard, IsAdminGuard],
    component: DevisesComponent,
  },
  {
    path: 'admin/pays',
    canActivate: [AuthGuard, IsAdminGuard],
    component: PaysComponent,
  },
  {
    path: 'admin/operators',
    canActivate: [AuthGuard, IsAdminGuard],
    component: OperatorComponent,
  },
  {
    path: 'admin/transactions',
    canActivate: [AuthGuard, IsAdminGuard],
    component: TransactionsComponent,
  },
  {
    path: 'admin/transactions/current',
    canActivate: [AuthGuard, IsAdminGuard],
    component: CurrentransComponent,
  },
  {
    path: 'admin/transactions/today',
    canActivate: [AuthGuard, IsAdminGuard],
    component: TodaytransComponent,
  },
  {
    path: 'admin/taux',
    canActivate: [AuthGuard, IsAdminGuard],
    component: TauxComponent,
  },
  {
    path: 'admin/tarif',
    canActivate: [AuthGuard, IsAdminGuard],
    component: TarifComponent,
  },
  // {
  //   path: 'connect/offline',
  //   component: OfflineComponent,
  // },
  { path: '**', component: SiteLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
