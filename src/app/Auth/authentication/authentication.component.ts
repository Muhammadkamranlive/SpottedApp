
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { BaseApiService } from '../../Services/base-api.service';
import { MessageService } from '../../Services/message.service';
import { AuthenticateService } from '../../Services/authenticate.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { Browser } from '@capacitor/browser';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { AuthResponseModel } from '../../Models/Authentication/AuthResponse';
GoogleAuth.initialize({
  clientId: '397350852908-5ubsfmeprfr2plu11gjcnrgiqaq8mu9b.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true
});
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{
  userForm     !: FormGroup;
  SocialLoginForm    !: FormGroup;
  loading       : boolean=false;
  showPassword  : boolean = false;
  res!:AuthResponseModel
  SocialLoading:boolean=false
  constructor
  (
     private router        :Router,
     private auth          :AuthService,
     private messageService: MessageService,
     private formBuilder:FormBuilder,
     private api:BaseApiService,
     private afAuth: AngularFireAuth
  )
  {

  }


  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      control.get('confirmPassword')?.setErrors(null);
    }
  }

  onSubmit()
  {

    if (this.userForm.valid)
    {
      this.loading=true;
      const formData = this.userForm.value;
      this.api.create("Auth/RegisterUsers",formData).subscribe(
        (response) =>
        {
          if(this.res.message.includes("Success")){
            this.loading = false;
            this.auth.settingPayLoad(response);
            this.messageService.showSuccessAlert("User Logged in Successfully.");
            this.router.navigate(['/userHome'])
          }
          else{
            this.loading = false;
            this.messageService.showErrorAlert(this.res.message);
          }
        },
        ( error) => {
          this.loading=false
          this.messageService.showErrorAlert(error);
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  Login(formData:any)
  {
    if (formData)
      {
        this.SocialLoading=true
        this.api.create("Auth/RegisterUsers",formData).subscribe(
          (response) =>
          {
            this.res=response
            if(this.res.message.includes("OK")){
              this.SocialLoading=false
              this.auth.settingPayLoad(response);
              this.messageService.showSuccessAlert("User Logged in Successfully.");
              this.router.navigate(['/userHome'])
            }
            else{
              this.SocialLoading=false
              this.messageService.showErrorAlert(this.res.message);
            }
          },
          ( error) => {
            this.SocialLoading=false
            this.messageService.showErrorAlert(error);
          }
        );
      } else {
        this.userForm.markAllAsTouched();
      }

 }

  initilizaform()
  {

    this.userForm = this.formBuilder.group
    (
      {
           email          : ['', [Validators.required, Validators.email]],
           password       : ['', [Validators.required, Validators.minLength(6)]],
           socialLogin    : ["No"],
           confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  SocialForm()
  {
    this.SocialLoading=true
    this.SocialLoginForm = this.formBuilder.group
    (
      {
           email          : ['', ],
           password       : ['', ],
           socialLogin    : ["No"],

      }
    );
    this.SocialLoading=false
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  ngOnInit() {
    this.initilizaform();
    this.SocialForm();
  }



 async googleSignIn() {
    try {
      this.SocialLoading=true
      const googleUser = await GoogleAuth.signIn();
      const credential = firebase.GoogleAuthProvider.credential(googleUser.authentication.idToken);
      const result     = await this.afAuth.signInWithCredential(credential);
      if(result.user){
         this.SocialLoginForm.patchValue({
          email:result.user.email,
          password:result.user.uid,
          socialLogin:"Yes"
         });
        this.Login(this.SocialLoginForm.value);
      }
    } catch (error) {
      this.SocialLoading=false
      //this.messageService.showErrorAlert("System having issue with google login you may use custom email password.");
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
