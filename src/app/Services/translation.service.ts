import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly LANG_KEY = 'selectedLanguage';

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
  ) {
    const savedLang = localStorage.getItem(this.LANG_KEY);
    if (savedLang)
    {
      this.setLanguage(savedLang);
    } else {
      this.setLanguage('fr');
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem(this.LANG_KEY, lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string): void {
    this.http.get(`./assets/i18n/${lang}.json`).subscribe((translations: any) => {
      this.translate.setTranslation(lang, translations);
      this.translate.use(lang);
    });
  }
}
