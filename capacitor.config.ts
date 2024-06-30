import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spotted.app',
  appName: 'spotted',
  webDir: 'dist/spotted/browser',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId : "397350852908-5ubsfmeprfr2plu11gjcnrgiqaq8mu9b.apps.googleusercontent.com",
      androidClientId : "397350852908-dmqphfs3mhoaa31b10d43q8lefdmc2f6.apps.googleusercontent.com",
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
