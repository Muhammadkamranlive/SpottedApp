import { Injectable }        from '@angular/core';
import { HttpClient }        from   '@angular/common/http';
import { Observable, of }    from 'rxjs';
import { catchError, tap }   from 'rxjs/operators';
import { JwtHelperService }  from '@auth0/angular-jwt';
import { CookieService }     from 'ngx-cookie-service';
import { Router }            from '@angular/router';
import { AuthResponseModel } from '../Models/Authentication/AuthResponse';
import { BaseApiService }    from './base-api.service';
import { BaseUrl } from '../../BaseUrl';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import 'firebase/auth';
import { Plugins } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey   = 'authToken';
  private mainPoint  = BaseUrl;
  private apiUrl     = this.mainPoint+'/api/';
  private pay:string = "false";
  authResponse!:AuthResponseModel;
  loading:boolean=false
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService,
    private router: Router,
    private api:BaseApiService,
    private afAuth: AngularFireAuth
  ) {}

  seondconfirmEmail(Email:any){
    this.http.post("Auth/SendComfirmEmail",{Email}).subscribe
    (
      (response)=>
      {

      }
      ,(
        error
      )=>{
        console.log(error)

      }
    )
   }

   GetBatach(BatchType: string): string
  {
    switch (BatchType) {
      case 'Gold':
        return '../../../assets/images/Point/badge lvl 9.png';
      case 'Silver':
        return '../../../assets/images/Point/badge lvl 8.png'; // Example color for Agression
      case 'Blue':
        return '../../../assets/images/Point/badge lvl1.png'; // Example color for Suspect
      default:
        return '../../../assets/images/Point/badge lvl1.png'; // Default color
    }
  }
  login(credentials: any) {
    this.loading=true;
    this.api.create(`Auth/login`, credentials).subscribe(
    (res)=>
    {

        this.authResponse=res;
        if (this.authResponse.token!==null)
         {
          const token = this.authResponse.token;
          this.saveToken(token);
          let role     =this.getRoles().toString();
          this.loading =false;
          if(this.authResponse.emailStatus==true)
          {
            if(role=='User'){
              this.router.navigate(['/userHome']);
            }
            if(role=='Administrator')
            {
              this.router.navigate(['/Admin']);
            }
          }
          else
          {
            this.router.navigate(['/confirmEmail']);
          }

        }
        else
        {
          this.loading=false
        }

    }
    ,
    (err)=>
    {

      this.loading=false;

    }
    );
  }

settingPayLoad(Auth:AuthResponseModel)
{
  if (Auth.token!==null)
    {
     const token  = Auth.token;
     this.saveToken(token);
   }
}

  PayStatus()
  {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.Payment;
    }
    return "";
  }
  GetPayStatus()
  {
    return this.cookieService.get(this.pay);
  }

  logout(): void {
    this.cookieService.delete(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
  return this.cookieService.get(this.tokenKey);;
  }

  private saveToken(token: string): void
  {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    this.cookieService.set(this.tokenKey, token, expires, '/');
  }


  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as string[];
      return roles || [];

    }
    return [];
  }

  getUID(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.uid;
    }
    return "";
  }
  getLock(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.LockoutEnabled;
    }
    return "";
  }
  getLoggedEmail(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.email;
    }
    return "";
  }

  getEmailStatus(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.EmailConfirmed;
    }
    return "";
  }

  getNameStatus(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.LegalName;
    }
    return "";
  }

  getCountryStatus(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.Country;
    }
    return "";
  }


  getAddressStatus(): string {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.Address;
    }
    return "";
  }





}
