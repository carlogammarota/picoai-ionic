import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.pico',
  appName: 'PicoAI Veo',
  webDir: 'dist',
  plugins: {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  },
  
};

export default config;
