import { SocialLogin } from './../Models/Authentication/UserModel';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { Browser } from '@capacitor/browser';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
GoogleAuth.initialize({
  clientId: '397350852908-5ubsfmeprfr2plu11gjcnrgiqaq8mu9b.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true
});

import {
  SignInWithApple,
  SignInWithAppleResponse,
  SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private afAuth: AngularFireAuth,private mess:MessageService) { }
  Credential!:SocialLogin
  // Google Sign-In
  async googleSignIn() {
    try {
      const googleUser = await GoogleAuth.signIn();
      const credential = firebase.GoogleAuthProvider.credential(googleUser.authentication.idToken);
      const res = await this.afAuth.signInWithCredential(credential);
      this.mess.showInfoAlert(res.user?.displayName||"dssf");
    } catch (error) {
       alert(error)

    }
  }

  async appleSignIn() {
    const provider = new firebase.OAuthProvider('apple.com');
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      const user = result.user;
      if (user) {
        console.log('Logged in with Apple:', user.email);
        console.log('Logged in with Apple:', user);
        return user.email;
      } else {
        throw new Error('User object not available');
      }
    } catch (error) {
      console.error('Error during Apple login:', error);
      throw error; // Rethrow the error to handle in the component
    }
  }



  // Sign Out
  async signOut() {
    return this.afAuth.signOut();
  }



  async applLogin() {
    const options: SignInWithAppleOptions = {
      clientId: 'com.adminspotted.app',
      redirectURI: 'https://admin-spotted.firebaseapp.com',
      scopes: 'email name',
      state: '12345',
      nonce: 'nonce',
    };

    try {
      const result: SignInWithAppleResponse = await SignInWithApple.authorize(options);
      console.log(result.response);
      const credential = new firebase.OAuthProvider('apple.com').credential({
        idToken: result.response.identityToken,
        rawNonce: 'nonce',
      });
      const signInResult = await this.afAuth.signInWithCredential(credential);
      console.log('Firebase sign-in result:', signInResult.user);
    } catch (error) {
      console.error('Error during Apple login:', error);
    }
  }
}
