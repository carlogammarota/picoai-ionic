<template>
  <ion-page>
    <!-- Encabezado principal -->
    <ion-header :translucent="true" mode="ios">
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-button fill="clear">
            <ion-icon slot="icon-only" :icon="menuOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        
        <ion-title class="ion-text-center">
          <h1>Radio Aura Producciones</h1>
          <ion-text color="tertiary">
            <p class="ion-no-margin">Tu conexión con la mejor música</p>
          </ion-text>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="dark">
      <!-- Banner de transmisión en vivo -->
      <div class="live-banner ion-padding">
        <ion-card mode="ios" color="medium-dark">
          <ion-img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819" alt="DJ en cabina"></ion-img>
          
          <ion-card-header>
            <ion-card-title class="ion-text-center">
              <ion-text color="light">Transmisión en Vivo</ion-text>
            </ion-card-title>
            <ion-card-subtitle class="ion-text-center">
              <ion-text color="tertiary">Ahora sonando: DJ Aura - Session #124</ion-text>
            </ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content class="ion-text-center">
            <ion-button expand="block" shape="round" color="primary">
              <ion-icon slot="start" :icon="playCircleOutline"></ion-icon>
              Escuchar en Vivo
            </ion-button>
            <ion-chip color="primary" outline>
              <ion-label>#Electrónica</ion-label>
            </ion-chip>
            <ion-chip color="tertiary" outline>
              <ion-label>#House</ion-label>
            </ion-chip>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Sección de programas destacados -->
      <div class="featured-shows ion-padding">
        <ion-text color="light">
          <h2 class="ion-text-center">Programas Destacados</h2>
        </ion-text>
        
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="4" v-for="show in featuredShows" :key="show.id">
              <ion-card mode="ios" color="medium-dark">
                <ion-badge color="danger" v-if="show.live">En Vivo</ion-badge>
                <ion-img :src="show.image" :alt="show.title"></ion-img>
                
                <ion-card-header>
                  <ion-card-title>
                    <ion-text color="light">{{ show.title }}</ion-text>
                  </ion-card-title>
                  <ion-card-subtitle>
                    <ion-text color="tertiary">{{ show.time }}</ion-text>
                  </ion-card-subtitle>
                </ion-card-header>
                
                <ion-card-content>
                  <ion-button expand="block" fill="outline" color="tertiary" size="small">
                    Ver más
                    <ion-icon slot="end" :icon="arrowForwardOutline"></ion-icon>
                  </ion-button>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Sección de conductores -->
      <div class="hosts-section ion-padding">
        <ion-text color="light">
          <h2 class="ion-text-center">Nuestros Conductores</h2>
        </ion-text>
        
        <ion-grid>
          <ion-row class="ion-justify-content-center">
            <ion-col size="6" size-md="3" v-for="host in hosts" :key="host.id">
              <div class="ion-text-center">
                <ion-avatar class="host-avatar">
                  <img :src="host.avatar" :alt="host.name">
                </ion-avatar>
                <ion-text color="light">
                  <h4>{{ host.name }}</h4>
                </ion-text>
                <ion-chip color="medium" outline>
                  <ion-label>{{ host.show }}</ion-label>
                </ion-chip>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- Sección de redes sociales -->
      <div class="social-section ion-padding">
        <ion-text color="light">
          <h2 class="ion-text-center">Síguenos en Redes</h2>
        </ion-text>
        
        <div class="ion-text-center ion-padding">
          <ion-button fill="clear" color="instagram" class="social-button">
            <ion-icon slot="icon-only" :icon="logoInstagram" size="large"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="tiktok" class="social-button">
            <ion-icon slot="icon-only" :icon="logoTiktok" size="large"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="patreon" class="social-button">
            <ion-icon slot="icon-only" :icon="logoPatreon" size="large"></ion-icon>
          </ion-button>
          <ion-button fill="clear" color="spotify" class="social-button">
            <ion-icon slot="icon-only" :icon="logoSpotify" size="large"></ion-icon>
          </ion-button>
        </div>
      </div>
    </ion-content>

    <!-- Barra inferior de pestañas -->
    <ion-tab-bar slot="bottom" color="dark" mode="ios">
      <ion-tab-button tab="inicio" href="/inicio" selected>
        <ion-icon :icon="homeOutline"></ion-icon>
        <ion-label>Inicio</ion-label>
      </ion-tab-button>
      
      <ion-tab-button tab="programas" href="/programas">
        <ion-icon :icon="listOutline"></ion-icon>
        <ion-label>Programas</ion-label>
      </ion-tab-button>
      
      <ion-tab-button tab="en-vivo" href="/en-vivo">
        <ion-icon :icon="radioOutline"></ion-icon>
        <ion-label>En Vivo</ion-label>
      </ion-tab-button>
      
      <ion-tab-button tab="contacto" href="/contacto">
        <ion-icon :icon="mailOutline"></ion-icon>
        <ion-label>Contacto</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonButtons, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent, IonImg, IonChip, IonLabel, IonBadge, 
  IonGrid, IonRow, IonCol, IonAvatar, IonTabBar, IonTabButton 
} from '@ionic/vue';
import { 
  menuOutline, playCircleOutline, arrowForwardOutline, 
  homeOutline, listOutline, radioOutline, mailOutline,
  logoInstagram, logoTiktok, logoPatreon, logoSpotify 
} from 'ionicons/icons';

// Datos de ejemplo para programas destacados
const featuredShows = [
  {
    id: 1,
    title: "Noche Electrónica",
    time: "Lunes 20:00 - 22:00",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    live: false
  },
  {
    id: 2,
    title: "Indie Sessions",
    time: "Miércoles 18:00 - 20:00",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
    live: true
  },
  {
    id: 3,
    title: "Jazz Lounge",
    time: "Viernes 21:00 - 23:00",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f",
    live: false
  }
];

// Datos de ejemplo para conductores
const hosts = [
  {
    id: 1,
    name: "DJ Aura",
    avatar: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad",
    show: "Noche Electrónica"
  },
  {
    id: 2,
    name: "Marta Sol",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    show: "Indie Sessions"
  },
  {
    id: 3,
    name: "Carlos Jazz",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    show: "Jazz Lounge"
  },
  {
    id: 4,
    name: "Luna Beat",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    show: "Urban Vibes"
  }
];
</script>

<style scoped>
/* Estilos personalizados usando variables de Ionic */
.live-banner {
  background: linear-gradient(to bottom, var(--ion-color-dark) 0%, var(--ion-color-medium) 100%);
}

.host-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
  border: 2px solid var(--ion-color-tertiary);
}

.social-button {
  --border-radius: 50%;
  margin: 0 5px;
}

ion-card {
  transition: transform 0.3s ease;
}

ion-card:active {
  transform: scale(0.98);
}

ion-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

ion-tab-bar {
  --background: var(--ion-color-dark);
  --border: none;
}

ion-tab-button {
  --color: var(--ion-color-medium);
  --color-selected: var(--ion-color-primary);
}
</style>