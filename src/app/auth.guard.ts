import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';
import { RedirectionStateService } from './Services/redirection-state.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private redirectionStateService: RedirectionStateService,
    private translate:TranslateService
  ) {

    this.onLanguageChange()
  }

  onLanguageChange() {
    let lan=localStorage.getItem('selectedLanguage') || 'fr'
    this.translate.setDefaultLang(lan);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


    if (this.redirectionStateService.hasRedirected()) {
      this.redirectionStateService.setRedirected(false); // reset the state
      return true;
    }

    if (this.authService.isAuthenticated()) {

      const roles = route.data['roles'] as Array<string>;
      if (roles && roles.length > 0) {
        const userRoles     = this.authService.getRoles();
        const paystatus     = this.authService.PayStatus();
        const NameStatus    = this.authService.getNameStatus();
        const AddressStatus = this.authService.getAddressStatus();
        const hasRequiredRole = roles.some(role => userRoles.includes(role));
        const statusEmail = this.authService.getEmailStatus();
        const statusLock = this.authService.getLock();
        const countryStatus = this.authService.getCountryStatus();

        if (hasRequiredRole) {
          if (NameStatus === "false" && state.url !== '/Nom') {
            this.redirectionStateService.setRedirected(true);
            return this.router.createUrlTree(['/Nom']);
          }
          if (countryStatus === "false" && state.url !== '/Residence') {
            this.redirectionStateService.setRedirected(true);
            return this.router.createUrlTree(['/Residence']);
          }
          if (AddressStatus === "false" && state.url !== '/Address') {
            this.redirectionStateService.setRedirected(true);
            return this.router.createUrlTree(['/Address']);
          }
          if (statusEmail === "false" && state.url !== '/confirmEmail') {
            this.redirectionStateService.setRedirected(true);
            return this.router.createUrlTree(['/confirmEmail']);
          }
          if (statusEmail === "true" && paystatus !== "OK" && state.url !== '/safer') {
            this.redirectionStateService.setRedirected(true);
            return this.router.createUrlTree(['/safer']);
          }
          if (statusEmail === "true" && paystatus === "true" && statusLock === "true" && state.url !== '/Locked') {
            this.redirectionStateService.setRedirected(true);
            return this.router.createUrlTree(['/Locked']);
          }
        } else {
          if (state.url !== '/unauthorized') {
            this.redirectionStateService.setRedirected(true);
            return this.router.createUrlTree(['/unauthorized']);
          }
        }
      }
    } else {
      if (state.url !== '/login') {
        this.redirectionStateService.setRedirected(true);
        return this.router.createUrlTree(['/login']);
      }
    }
    return true;
  }
}
