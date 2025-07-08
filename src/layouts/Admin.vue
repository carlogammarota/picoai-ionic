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

</script>