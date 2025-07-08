<template>
    <ion-menu content-id="main-content">
      <div class="">
        <ion-header class="">
          <ion-toolbar class="">
            <ion-title class="bebas-neue-regular menu-title ml-4">Menu Aura</ion-title>
          </ion-toolbar>
        </ion-header>
      <ion-content class="ion-padding ml-4">This is the menu content.</ion-content>
      </div>
    </ion-menu>

  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>

        <ion-title class="titulo-style cal-sans-regular">Radio Aura</ion-title>

        <!-- Imagen del usuario conectadx -->
        <ion-buttons slot="end">
          <ion-avatar class="user-avatar">
            <img src="https://i.pravatar.cc/150?img=12" alt="Usuario" />
          </ion-avatar>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-router-outlet :transitions="false"></ion-router-outlet>
      <!-- <router-view  /> -->
    </ion-content>
  </ion-page>
    
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

</script>