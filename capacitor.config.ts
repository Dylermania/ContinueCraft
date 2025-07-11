
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.compathub.app',
  appName: 'CompatHub',
  webDir: 'dist/public',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0F172A",
      showSpinner: false
    }
  }
};

export default config;
