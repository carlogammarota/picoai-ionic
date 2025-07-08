<template>
    <div>
  
      <div class="ion-padding">
        <ion-button expand="block" @click="sendFakeNotification">
          Notificar
        </ion-button>
  
        <ion-card v-if="notification.title">
          <ion-card-header>
            <ion-card-title>{{ notification.title }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>{{ notification.body }}</ion-card-content>
        </ion-card>
    </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  } from '@ionic/vue'
  
  import { ref } from 'vue'
  
  const notification = ref({
    title: '',
    body: ''
  })
  
  function sendFakeNotification() {
    notification.value = {
      title: '🔔 Notificación de prueba',
      body: 'Esto simula una notificación push.'
    }
  
    console.log('Simulated push notification shown!')
  }
  </script>
  
  <style scoped>
  ion-card {
    margin-top: 20px;
  }
  </style>
  