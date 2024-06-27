import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicPageComponent } from './Domain/polic-page/polic-page.component';
import { SearchComponent } from './Domain/search/search.component';
import { SpottedHomeComponent } from './Domain/spotted-home/spotted-home.component';

import { AuthenticationComponent } from './Auth/authentication/authentication.component';

import { FelicilitationsComponent } from './Screens/felicilitations/felicilitations.component';

import { SaferJourneyComponent } from './Screens/safer-journey/safer-journey.component';
import { UserHomeComponent } from './User/user-home/user-home.component';
import { DicussionComponent } from './Domain/dicussion/dicussion.component';

import { DicussionChatAssitanceComponent } from './Domain/dicussion-chat-assitance/dicussion-chat-assitance.component';
import { MenuPageComponent } from './Domain/menu-page/menu-page.component';

import { AideComponent } from './Domain/aide/aide.component';
import { GCUComponent } from './Domain/gcu/gcu.component';

import { LanguagesComponent } from './Domain/languages/languages.component';
import { NotificationsComponent } from './Domain/notifications/notifications.component';
import { StatisticsComponent } from './Domain/statistics/statistics.component';
import { AddressComponent } from './Auth/address/address.component';
import { EmailVerificationComponent } from './Auth/email-verification/email-verification.component';
import { ForgetPasswordComponent } from './Auth/forget-password/forget-password.component';
import { LoginComponent } from './Auth/login/login.component';
import { NomComponent } from './Auth/nom/nom.component';
import { OtpVerifyComponent } from './Auth/otp-verify/otp-verify.component';
import { ResidanceComponent } from './Auth/residance/residance.component';
import { ProfileAbendomentComponent } from './Domain/Profile/profile-abendoment/profile-abendoment.component';
import { ProfileEditComponent } from './Domain/Profile/profile-edit/profile-edit.component';
import { ProfileMenuPageComponent } from './Domain/Profile/profile-menu-page/profile-menu-page.component';
import { Intro1Component } from './Intro/intro1/intro1.component';
import { Intro2Component } from './Intro/intro2/intro2.component';
import { HomeComponent } from './Screens/home/home.component';
import { AuthGuard } from './auth.guard';
import { PaymentSuccessComponent } from './Screens/payment-success/payment-success.component';
import { SignalLocationComponent } from './Domain/signal-location/signal-location.component';
import { PaymentElementsComponent } from './Stripe/payment-elements/payment-elements.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ShowAllUsersComponent } from './Admin/show-all-users/show-all-users.component';
import { AdminNotificationsComponent } from './Admin/admin-notifications/admin-notifications.component';
import { AdminSignalTypesComponent } from './Admin/admin-signal-types/admin-signal-types.component';
import { AdminPaymentsComponent } from './Admin/admin-payments/admin-payments.component';
import { LoginTestComponent } from './Test/login-test/login-test.component';
import { UserNotificationsComponent } from './Domain/user-notifications/user-notifications.component';
import { UserPaymentsComponent } from './Payments/user-payments/user-payments.component';

const routes: Routes = [
  {
    path: 'Connexion',
    component: AuthenticationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgetPass',
    component: ForgetPasswordComponent,
  },
  {
    path: 'otp',
    component: EmailVerificationComponent,
  },
  {
    path: 'userHome',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Residence',
    component: ResidanceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Address',
    component: AddressComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Nom',
    component: NomComponent,
  },
  {
    path: 'confirmEmail',
    component: OtpVerifyComponent,
  },
  {
    path: 'SearchSpotted',
    component: SearchComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'SpottedHome',
    component: SpottedHomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'userNotifications',
    component: UserNotificationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'Discuter',
    component: DicussionComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },

  {
    path: 'Chat/:ChatType',
    component: DicussionChatAssitanceComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'AddressLocation/:location',
    component: SignalLocationComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'ProfileUser',
    component: ProfileMenuPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'stat',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },

  {
    path: 'ProfileAbedonment',
    component: ProfileAbendomentComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'userPaymentClient',
    component: UserPaymentsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Upgrade/:id',
    component: PaymentElementsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },

  {
    path: 'Aide',
    component: AideComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'GCU',
    component: GCUComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'editProfile',
    component: ProfileEditComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Lanauges',
    component: LanguagesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Menue',
    component: MenuPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'PolicMan',
    component: PolicPageComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Facilitation',
    component: FelicilitationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'safer',
    component: SaferJourneyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'success',
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator'] },
  },
  {
    path: 'Payments',
    component: AdminPaymentsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator'] },
  },
  {
    path: 'Users',
    component: ShowAllUsersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator'] },
  },
  {
    path: 'intro1',
    component: Intro1Component,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Notify/:id',
    component: AdminNotificationsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'Signal/:id',
    component: AdminSignalTypesComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: 'intro2',
    component: Intro2Component,
    canActivate: [AuthGuard],
    data: { roles: ['Administrator', 'User'] },
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
