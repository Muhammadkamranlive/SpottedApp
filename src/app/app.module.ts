import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from "@angular/google-maps";
import { DashBoardComponent } from './Domain/dash-board/dash-board.component';
import { PolicPageComponent } from './Domain/polic-page/polic-page.component';
import { SearchComponent } from './Domain/search/search.component';
import { SpottedHomeComponent } from './Domain/spotted-home/spotted-home.component';
import { BottomNavigationComponent } from './Navigation/bottom-navigation/bottom-navigation.component';
import { SidebarModule } from 'primeng/sidebar';
import { AuthenticationComponent } from './Auth/authentication/authentication.component';

import { FelicilitationsComponent } from './Screens/felicilitations/felicilitations.component';

import { HomeComponent } from './Screens/home/home.component';

import { SaferJourneyComponent } from './Screens/safer-journey/safer-journey.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { TopBarComponent } from './Navigation/top-bar/top-bar.component';
import { DicussionComponent } from './Domain/dicussion/dicussion.component';
import { DicussionChatAssitanceComponent } from './Domain/dicussion-chat-assitance/dicussion-chat-assitance.component';
import { ChatBottomComponent } from './Domain/chat-bottom/chat-bottom.component';
import { MenuPageComponent } from './Domain/menu-page/menu-page.component';
import { BottomProfileComponent } from './Domain/bottom-profile/bottom-profile.component';

import { AideComponent } from './Domain/aide/aide.component';
import { BottomButtoComponent } from './Domain/bottom-butto/bottom-butto.component';
import { GCUComponent } from './Domain/gcu/gcu.component';

import { LanguagesComponent } from './Domain/languages/languages.component';
import { NotificationsComponent } from './Domain/notifications/notifications.component';
import { StatisticsComponent } from './Domain/statistics/statistics.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './Services/auth.service';
import { ImageUploadService } from './Services/image-upload-service.service';
import { ApiInterceptor } from './api-interceptor.service';
import { AuthInterceptor } from './auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressComponent } from './Auth/address/address.component';
import { EmailVerificationComponent } from './Auth/email-verification/email-verification.component';
import { LoginComponent } from './Auth/login/login.component';
import { NomComponent } from './Auth/nom/nom.component';
import { OtpVerifyComponent } from './Auth/otp-verify/otp-verify.component';
import { ResidanceComponent } from './Auth/residance/residance.component';
import { ProfileAbendomentComponent } from './Domain/Profile/profile-abendoment/profile-abendoment.component';
import { ProfileEditComponent } from './Domain/Profile/profile-edit/profile-edit.component';
import { ProfileMenuPageComponent } from './Domain/Profile/profile-menu-page/profile-menu-page.component';
import { Intro1Component } from './Intro/intro1/intro1.component';
import { Intro2Component } from './Intro/intro2/intro2.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { SpinnerComponent } from './Screens/spinner/spinner.component';
import { PaymentSuccessComponent } from './Screens/payment-success/payment-success.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AccordionModule } from 'primeng/accordion';
import { DatePipe } from '@angular/common';
// Import the library
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentElementsComponent } from './Stripe/payment-elements/payment-elements.component';
import { SignalLocationComponent } from './Domain/signal-location/signal-location.component';
import { TopBatchComponent } from './Domain/top-batch/top-batch.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ShowAllUsersComponent } from './Admin/show-all-users/show-all-users.component';
import { AdminNotificationsComponent } from './Admin/admin-notifications/admin-notifications.component';
import { AdminSignalTypesComponent } from './Admin/admin-signal-types/admin-signal-types.component';
import { AdminTopNavComponent } from './Admin/admin-top-nav/admin-top-nav.component';
import { TimeAgoPipe } from './time-ago.pipe';
import { AdminLogsComponent } from './Admin/admin-logs/admin-logs.component';
import { AdminPaymentsComponent } from './Admin/admin-payments/admin-payments.component';
import { environment, environmentFire } from './Environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoginTestComponent } from './Test/login-test/login-test.component';
import { UserNotificationsComponent } from './Domain/user-notifications/user-notifications.component';
import { UserPaymentsComponent } from './Payments/user-payments/user-payments.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
// Translation loader function
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    ResidanceComponent,
    AddressComponent,
    NomComponent,
    EmailVerificationComponent,
    FelicilitationsComponent,
    SaferJourneyComponent,
    Intro1Component,
    Intro2Component,
    LoginComponent,
    ForgetPasswordComponent,
    OtpVerifyComponent,
    BottomNavigationComponent,
    UserHomeComponent,
    SearchComponent,
    DashBoardComponent,
    SpottedHomeComponent,
    PolicPageComponent,
    TopBarComponent,
    DicussionComponent,
    DicussionChatAssitanceComponent,
    ChatBottomComponent,
    MenuPageComponent,
    BottomProfileComponent,
    ProfileMenuPageComponent,
    ProfileAbendomentComponent,
    AideComponent,
    BottomButtoComponent,
    GCUComponent,
    ProfileEditComponent,
    LanguagesComponent,
    NotificationsComponent,
    StatisticsComponent,
    SpinnerComponent,
    PaymentSuccessComponent,
    PaymentElementsComponent,
    SignalLocationComponent,
    TopBatchComponent,
    AdminDashboardComponent,
    ShowAllUsersComponent,
    AdminNotificationsComponent,
    AdminSignalTypesComponent,
    AdminTopNavComponent,
    TimeAgoPipe,
    AdminLogsComponent,
    AdminPaymentsComponent,
    LoginTestComponent,
    UserNotificationsComponent,
    UserPaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOtpInputModule,
    SidebarModule,
    AccordionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxStripeModule.forRoot(),
    AngularFireModule.initializeApp(environmentFire.firebase),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
      },
    }),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [
    JwtHelperService,
    AuthService,
    TranslateService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    ImageUploadService,
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
