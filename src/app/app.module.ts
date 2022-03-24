import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { AngularEditorModule } from '@kolkov/angular-editor';

// import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminNavComponent } from './components/admin/nav/admin-nav.component';
import { AdminHomeComponent } from './components/admin/home/admin-home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { PaysComponent } from './components/admin/pays/pays.component';
import { DevisesComponent } from './components/admin/devises/devises.component';
import { PublicitesComponent } from './components/admin/publicites/publicites.component';

import { SiteNavComponent } from './components/site/site-nav/site-nav.component';
import { SiteHomeComponent } from './components/site/site-home/site-home.component';
import { SiteProfilComponent } from './components/site/site-profil/site-profil.component';
import { SiteTransactionsComponent } from './components/site/site-transactions/site-transactions.component';
import { SiteTransacNavComponent } from './components/site/site-transac-nav/site-transac-nav.component';
import { AuthGuard } from './guards/admin/auth.guard';
import { IsConnectGuard } from './guards/admin/is-connect.guard';
import { IsAdminGuard } from './guards/admin/is-admin.guard';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { TransactionsComponent } from './components/admin/transactions/transactions.component';
import { SiteLoginComponent } from './components/site/site-login/site-login.component';
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
import { TarifComponent } from './components/admin/tarif/tarif.component';
import { TauxComponent } from './components/admin/taux/taux.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OfflineComponent } from './components/globale/offline/offline.component';
import { RechargeComponent } from './components/site/recharge/recharge.component';
import { TransacInternationalComponent } from './components/site/transac-international/transac-international.component';
import { RetraitComponent } from './components/site/retrait/retrait.component';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminNavComponent,
    AdminHomeComponent,
    AdminsComponent,
    UsersComponent,
    DevisesComponent,
    SiteNavComponent,
    SiteLoginComponent,
    SiteHomeComponent,
    SiteProfilComponent,
    SiteTransactionsComponent,
    SiteTransacNavComponent,
    AdminsComponent,
    UsersComponent,
    PaysComponent,
    DevisesComponent,
    PublicitesComponent,
    TransactionsComponent,
    ForgotComponent,
    ResetComponent,
    RegisterComponent,
    InfosComponent,
    KycComponent,
    CurrentransComponent,
    TodaytransComponent,
    OperatorComponent,
    ListransacComponent,
    DetailsTransComponent,
    TransCompteRdcComponent,
    TransCompteGabonComponent,
    TarifComponent,
    TauxComponent,
    OfflineComponent,
    RechargeComponent,
    TransacInternationalComponent,
    RetraitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxUsefulSwiperModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],

  providers: [AuthGuard, IsConnectGuard, IsAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
