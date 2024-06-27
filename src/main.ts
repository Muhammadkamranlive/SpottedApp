import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
GoogleAuth.initialize({
  clientId: '397350852908-5ubsfmeprfr2plu11gjcnrgiqaq8mu9b.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true
});

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
