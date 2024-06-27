import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../Services/authenticate.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login-test',
  templateUrl: './login-test.component.html',
  styleUrl: './login-test.component.css'
})
export class LoginTestComponent {
  constructor(private afAuth: AngularFireAuth,public authService: AuthenticateService,private router:Router) {}





  googleSignIn() {
    this.authService
      .googleSignIn()
      .then((result) => {
         if(result!=null){
            console.log(result)
         }

      })
      .catch((error) => {
        console.error('Error during Google login:', error);
      });
  }



  appleSignIn() {
    this.authService.applLogin();
  }

  signOut() {
    this.authService.signOut().then(() => {
      console.log('Logged out');
    });
  }


}
