<template>
  <ion-router-outlet :transitions="false"></ion-router-outlet>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenu, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonApp, 
  IonRouterOutlet 
} from '@ionic/vue';

import { useAuthStore } from '@/stores/auth';
import { usePushNotifications } from '@/componentes/usePushNotifications';
import { connectSocket, getSocket } from "@/socket-io";
import client from '@/feathersClient';

// Si vas a usar `auth`, puedes descomentar esto:
// const auth = useAuthStore()

const { initPush } = usePushNotifications();

onMounted(() => {
  connectSocket();
  initPush();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cal+Sans&family=Chau+Philomene+One:ital@0;1&family=Codystar:wght@300;400&family=Exile&display=swap');
.chau-philomene-one-regular {
  font-family: "Chau Philomene One", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.user-avatar {
  width: 36px;
  height: 36px;
  margin-right: 8px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}


.menu-title {
  font-size: 30px;
  color: #ff4c9a;
  font-weight: 400;
}

.chau-philomene-one-regular-italic {
  font-family: "Chau Philomene One", sans-serif;
  font-weight: 400;
  font-style: italic;
}
.cal-sans-regular {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.exile-regular {
  font-family: "Exile", system-ui;
  font-weight: 400;
  font-style: normal;
}
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.codystar-light {
  font-family: "Codystar", sans-serif;
  font-weight: 300;
  font-style: normal;
}

.codystar-regular {
  font-family: "Codystar", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.titulo-style {
  color: #ff4c9a;
  font-size: 30px;
}

</style>
