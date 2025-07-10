<template>
  <ion-page>

    <ion-content class="ion-padding">

      <!-- Título / descripción -->
      <div class="text-center mb-4">
        <h2 class="text-xl font-bold">Generador de Imágenes AI</h2>
        <p class="text-sm text-gray-500">Transformá tu imaginación en imágenes con IA.</p>
      </div>

      <!-- Formulario básico de prompt -->
      <ion-item>
        <!-- <ion-label position="floating">Escribí tu prompt</ion-label> -->
        <ion-input placeholder="Una ciudad futurista al atardecer..." />
      </ion-item>

      <!-- Botón generar -->
      <div class="mt-4 flex justify-center">
        <ion-button expand="block" color="primary">Generar Imagen</ion-button>
      </div>

      <!-- Imagen generada (placeholder) -->
      <div class="mt-8 text-center">
        <ion-avatar class="mx-auto" style="width: 300px; height: 300px;">
          <img src="https://via.placeholder.com/300x300.png?text=AI+Image" alt="Imagen generada" />
        </ion-avatar>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-title size="small" class="text-center">Powered by PicoAI</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAvatar,
  IonFooter
} from '@ionic/vue'

// closeMenu computed store
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()

import { onMounted } from 'vue'
onMounted(async() => {
  // Cerrar el menú al montar el componente
 menuStore.closeMenu()
})
</script>

<style scoped>
/* Opcional: Estilos adicionales */
</style>
