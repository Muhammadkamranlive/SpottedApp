// import { App } from '@capacitor/app';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { Plugins } from '@capacitor/core';
const { GoogleAuth } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    await GoogleAuth['initialize']();
  }
  ngOnInit(): void {
   // this.getUserHome();
  }
}
