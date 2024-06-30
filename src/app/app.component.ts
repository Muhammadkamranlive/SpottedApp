// import { App } from '@capacitor/app';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
const { GoogleAuth } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  constructor( private translate:TranslateService) {

  }

  onLanguageChange() {
    let lan=localStorage.getItem('selectedLanguage') || 'fr'
    this.translate.setDefaultLang(lan);
  }

  ngOnInit(): void {
   this.onLanguageChange();
  }
}
