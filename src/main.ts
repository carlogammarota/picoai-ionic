import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
/* Theme variables */
// import './theme/variables.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';




/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */

// import '@ionic/vue/css/palettes/dark.system.css';

// main.js o index.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ App cargada');

  // Escuchar el token enviado desde Swift
  window.addEventListener('fcmToken', (event) => {
    console.log("📲 Token FCM recibido desde Swift:", event.detail.value);

    // Por ejemplo, podrías guardarlo en localStorage:
    localStorage.setItem('fcm_token', event.detail.value);

    // O mandarlo a tu servidor con fetch/axios
    // fetch('/api/guardar-token', { method: 'POST', body: JSON.stringify({ token: event.detail.value }) });
  });
});

// import '@formkit/genesis'
// import '@formkit/pro/genesis'


import '@formkit/themes/tailwindcss/genesis'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(IonicVue)
app.use(pinia)  // 👉 Esto debe venir ANTES de cualquier uso de Pinia
app.use(router)
app.use(plugin, defaultConfig({
  theme: 'genesis' // will load from CDN and inject into document head
})) // Configuración de FormKit

router.isReady().then(() => {
  app.mount('#app');
});
