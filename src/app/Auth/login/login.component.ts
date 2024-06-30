import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { Browser } from '@capacitor/browser';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { AuthResponseModel } from '../../Models/Authentication/AuthResponse';
import { AuthenticateService } from '../../Services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  userForm: FormGroup;
  SocialLoginForm    !: FormGroup;
  errorMessage = '';
  showPassword: boolean = false;
  res!:AuthResponseModel
  SocialLoading:boolean=false
  constructor
    (
      private authService: AuthService,
      private router: Router,
      private Api: BaseApiService,
      private messageService: MessageService,
      private afAuth: AngularFireAuth,
      private formBuilder:FormBuilder,
      private auth:AuthenticateService
    ) {

    GoogleAuth.initialize({
      clientId: '397350852908-5ubsfmeprfr2plu11gjcnrgiqaq8mu9b.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true
    });
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {

    if (this.userForm.valid) {
      this.loading = true;
      const formData = this.userForm.value;
      this.Api.create("Auth/login", formData).subscribe(
        (response) => {
          this.res=response;
          if(this.res.message.includes("Success")){
            this.loading = false;
            this.authService.settingPayLoad(response);
            this.messageService.showSuccessAlert("User Logged in Successfully.");
            this.router.navigate(['/userHome'])
          }
          else{
            this.loading = false;
            this.messageService.showErrorAlert(this.res.message);
          }

        },
        (error) => {
          this.loading = false
          this.messageService.showErrorAlert(error);
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  SocialForm()
  {
    this.SocialLoading=true
    this.SocialLoginForm = this.formBuilder.group
    (
      {
           email          : ['', ],
           password       : ['', ],
      }
    );
    this.SocialLoading=false
  }

  Login(formData:any) {

    if (formData) {
      this.SocialLoading = true;
      this.Api.create("Auth/Sociallogin", formData).subscribe(
        (response) => {
          this.res=response;
          if(this.res.message.includes("Success"))
          {
            this.authService.settingPayLoad(response);
            this.SocialLoading = false;
            this.messageService.showSuccessAlert("User Logged in Successfully.");
            this.router.navigate(['/userHome'])
          }
          else{
            this.SocialLoading = false;
            this.messageService.showErrorAlert(this.res.message);
          }

        },
        (error) => {
          this.loading = false
          this.messageService.showErrorAlert(error);
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.SocialForm();
    this.loading = this.authService.loading;
  }

  async googleSignInPop() {
    this.auth
    .googleSignIn()
    .then((result) => {
       console.log('sfsf')
    })
    .catch((error) => {
      console.error('Error during Google login:', error);
    });

  }

  async googleSign() {
    try {
      const user = await GoogleAuth.signIn();
      this.SocialLoginForm.patchValue({
        email: user.email,
        password:user.id,
        socialLogin:"Yes"
       });
      this.Login(this.SocialLoginForm.value);

    } catch (error) {
      console.error('Error signing in with Google', error);
      // Handle error, e.g., show error message
    }
  }

  async googleSignIn() {
    try {
      this.SocialLoading=true
      const googleUser = await GoogleAuth.signIn();
      const credential = firebase.GoogleAuthProvider.credential(googleUser.authentication.idToken);
      const result     = await this.afAuth.signInWithPopup(credential);
      if(result.user)
      {
         this.SocialLoginForm.patchValue({
          email:result.user.email,
          password:result.user.uid,
          socialLogin:"Yes"
         });
        this.Login(this.SocialLoginForm.value);

      }
    } catch (error) {
      this.SocialLoading=false
      this.messageService.showErrorAlert("System having issue with google login you may use custom email password."+error);
    }
  }

  async appleSignIn() {
    const provider = new firebase.OAuthProvider('apple.com');
    try {
      this.SocialLoading=true
      const result = await this.afAuth.signInWithPopup(provider);
      if(result.user){
        this.SocialLoginForm.patchValue({
          email:result.user.email,
          password:result.user.uid,
          socialLogin:"Yes"
         });
       this.Login(this.SocialLoginForm.value);
     }
    } catch (error)
    {
      this.SocialLoading=false
      //this.messageService.showErrorAlert("System having issue with google login you may use custom email password.");
    }
  }

}
