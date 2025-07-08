<template>
  <ion-page>
    <ion-content class="relative bg-cover bg-center cal-sans-regular">
      <div class="absolute inset-0 bg-opacity-100 z-0"></div>
      <div class="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <!-- Contenedor centrado -->

        <div class="w-full max-w-md text-center">
          <!-- Botón atrás -->
          <div class="mb-6 flex items-center gap-2 cursor-pointer" @click="goHome">
            <ion-icon name="arrow-back-outline" class="text-2xl text-gray-700" />
            <span class="text-gray-700 text-lg">Atrás</span>
          </div>

          <!-- Logo y título -->
          <img class="mx-auto h-64 w-auto animate-bounce" src="@/assets/Logo.png" alt="Logo de la aplicación" />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
          <p class="mt-2 text-sm text-gray-600">Crea o accede a tu cuenta para continuar</p>

          <!-- Contenedor del formulario -->
          <div class="mt-8">
            <div class="bg-white py-8 px-6 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
              <!-- Botón de Google OAuth -->
              <div class="space-y-4">
                <button
                  @click="loginWithGoogle"
                  class="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                  :disabled="loading">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB" alt="Google" class="h-5 w-5 my-4" />
                  <span class="ml-2">Google</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Notificación de error -->
          <ion-toast
            :is-open="error !== ''"
            :message="error"
            :duration="3000"
            @didDismiss="error = ''"
            color="danger" />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts" >
import { ref } from 'vue';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonSpinner,
  IonToast,
  useIonRouter,
  IonRouterOutlet,
  IonButton,
  IonLabel,
  IonButtons,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonItem,
  IonList,
  IonBackButton,
  IonInput,
  IonSelect,
} from '@ionic/vue';
import {
  mailOutline,
  lockClosedOutline
} from 'ionicons/icons';

const showEmailForm = ref(false);
const loading = ref(false);
const error = ref('');
const email = ref('');
const password = ref('');
const ionRouter = useIonRouter();

const loginWithGoogle = () => {
  loading.value = true;
  window.location.href = 'https://api.auraproducciones.lat/auth/google';

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};


const goHome = async () => {
  //  ionRouter.push('/');
  ionRouter.push('/');
};
</script>

<style scoped>
.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

button {
  transition: all 0.2s ease-in-out;
}

button:focus-visible,
input:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

button:hover {
  transform: translateY(-1px);
}

.custom-background {
  --background: url('https://images2.alphacoders.com/135/thumb-1920-1355048.png') no-repeat center center / cover;
  background-size: cover;
  background-position: center;
}
</style>
