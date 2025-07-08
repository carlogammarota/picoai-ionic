<template>
  <ion-page>
  <ion-menu  menu-id="first-menu" content-id="main-content"
  type="overlay"
  class="driver-menu pb-8"
 
  :is-open="isOpen">
    <ion-header class="bg-white">
      <ion-toolbar class="bg-white">
        <div class="flex items-center px-4 py-3">
          <ion-avatar class="mr-3">
            <img src="@/assets/picoai.png" alt="Usuario" />
          </ion-avatar>
          <div class="" style="margin: 0;padding: 0;">
            <h2 class="text-lg font-bold bebas-neue-regular py-0 my-0" style="margin-top: 15px; font-size: 50px;" >PicoAI</h2>
          </div>
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="flex flex-col gap-3">
        <!-- 📁 Navegación principal -->
        <div>
          
          <p class="text-xs text-gray-400 uppercase px-4">Navegación</p>
          <ion-list lines="none">
            <ion-item button router-link="/">
              <ion-icon :icon="homeOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Inicio</ion-label>
            </ion-item>
            <ion-item button router-link="/radio">
              <ion-icon :icon="radioOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Radio en Vivo</ion-label>
            </ion-item>
            <ion-item button router-link="/podcasts">
              <ion-icon :icon="micOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Podcasts</ion-label>
            </ion-item>
            <ion-item button router-link="/eventos">
              <ion-icon :icon="calendarOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Eventos</ion-label>
            </ion-item>
            <ion-item button router-link="/programacion">
              <ion-icon :icon="timeOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Programación</ion-label>
            </ion-item>
            <ion-item button router-link="/chat">
              <ion-icon :icon="chatbubblesOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Chat</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- 🎵 Contenido multimedia -->
        <div>
          <p class="text-xs text-gray-400 uppercase px-4">Multimedia</p>
          <ion-list lines="none">
            <ion-item button router-link="/videos">
              <ion-icon :icon="videocamOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Videos</ion-label>
            </ion-item>
            <ion-item button router-link="/galeria">
              <ion-icon :icon="imagesOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Galería</ion-label>
            </ion-item>
            <ion-item button router-link="/favoritos">
              <ion-icon :icon="heartOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Favoritos</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- ℹ️ Información -->
        <div>
          <p class="text-xs text-gray-400 uppercase px-4">Información</p>
          <ion-list lines="none">
            <ion-item button router-link="/nosotros">
              <ion-icon :icon="informationCircleOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Sobre Nosotros</ion-label>
            </ion-item>
            <ion-item button router-link="/equipo">
              <ion-icon :icon="peopleOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Nuestro Equipo</ion-label>
            </ion-item>
            <ion-item button router-link="/contacto">
              <ion-icon :icon="mailOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Contacto</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- ⚙️ Ajustes -->
        <div>
          <p class="text-xs text-gray-400 uppercase px-4">Configuración</p>
          <ion-list lines="none">
            <ion-item button router-link="/perfil">
              <ion-icon :icon="personOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Mi Perfil</ion-label>
            </ion-item>
            <ion-item button router-link="/notificaciones">
              <ion-icon :icon="notificationsOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Notificaciones</ion-label>
            </ion-item>
            <ion-item button router-link="/ajustes">
              <ion-icon :icon="settingsOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Ajustes</ion-label>
            </ion-item>
            <ion-item button router-link="/ayuda">
              <ion-icon :icon="helpCircleOutline" slot="start" style="margin-right: 10px;"></ion-icon>
              <ion-label>Ayuda</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- 🚪 Cerrar sesión -->
        <div class="mt-auto px-4 pt-4 mb-16">
          <ion-button expand="block" color="danger" @click="logout">
            <ion-icon :icon="logOutOutline" slot="start" style="margin-right: 10px;"></ion-icon>
            Cerrar Sesión
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-menu>

  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button  @click="menuStore.openMenu()"></ion-menu-button>
        </ion-buttons>
        <!-- aca hay que setear el Veo 3 dependiendo de donde esta.  -->
        <ion-title class="titulo-style cal-sans-regular"><span class="text-blue-400">PicoAI</span>  Veo 3</ion-title>
        <ion-buttons slot="end">
          <ion-avatar class="user-avatar">
            <img src="@/assets/picoai.png" alt="Usuario" />
          </ion-avatar>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-router-outlet :transitions="false"></ion-router-outlet>
    </ion-content>


    
  </ion-page>
</ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar,
  IonAvatar, IonItem, IonLabel, IonList, IonIcon, IonButton, IonRouterOutlet, menuController, IonFooter
} from '@ionic/vue'

import {
  homeOutline,
  radioOutline,
  micOutline,
  calendarOutline,
  timeOutline,
  chatbubblesOutline,
  videocamOutline,
  imagesOutline,
  heartOutline,
  informationCircleOutline,
  peopleOutline,
  mailOutline,
  personOutline,
  notificationsOutline,
  settingsOutline,
  helpCircleOutline,
  logOutOutline
} from 'ionicons/icons'


import { computed, onMounted } from 'vue';
import { useIonRouter } from '@ionic/vue';
import { useAuthStore } from '@/stores/auth';
import { useMenuStore } from '@/stores/menuStore';
// import { menuController } from '@ionic/core'


const ionRouter = useIonRouter();
const authStore = useAuthStore();
const menuStore = useMenuStore();
const isOpen = computed(() => menuStore.state.isOpen); // <- correcto



  onMounted(async () => {

   //resize footer 
    const footer = document.querySelector('.resize-vertical');

    //hacer resizable el footer



    


  });


const logout = async () => {
  console.log("Cerrando sesión...")
  menuStore.closeMenu();
  menuController.close()

  authStore.logout();
  ionRouter.push('/login');
}



</script>


<style>
.custom-footer {
  background-color: #1b1427;
  border: none;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
}

.message-container {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
}

.message-input {
  flex: 1;
  background-color: #2a1f3d;
  color: white;
  border: 1px solid #3d2e5c;
  border-radius: 25px;
  padding: 14px 20px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.message-input::placeholder {
  color: #a18bb9;
  opacity: 0.8;
}

.message-input:focus {
  border-color: #ff4c9a;
  box-shadow: 0 0 0 2px rgba(255, 76, 154, 0.3);
}

.send-button {
  background-color: #ff4c9a;
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.send-button:hover {
  background-color: #ff5fa3;
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
}

.send-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.send-icon {
  width: 20px;
  height: 20px;
}
</style>