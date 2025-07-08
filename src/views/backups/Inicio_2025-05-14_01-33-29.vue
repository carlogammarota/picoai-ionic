<template>
  <ion-page>
    <ion-content :fullscreen="true" color="dark">
      <section class="live-banner ion-padding">
        <ion-card mode="ios" color="medium-dark">
          <ion-img 
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819" 
            alt="DJ en cabina"
            loading="lazy"
            width="100%"
            height="200px"
          />
          
          <ion-card-header>
            <ion-card-title class="ion-text-center">
              <ion-text color="light">Transmisión en Vivo</ion-text>
            </ion-card-title>
            <ion-card-subtitle class="ion-text-center">
              <ion-text color="tertiary">Ahora sonando: DJ Aura - Session #124</ion-text>
            </ion-card-subtitle>
          </ion-card-header>
          
          <ion-card-content class="ion-text-center">
            <ion-button 
              expand="block" 
              shape="round" 
              color="primary"
              aria-label="Escuchar transmisión en vivo"
              @click="playLiveStream"
            >
              <ion-icon :icon="playCircle" slot="start"></ion-icon>
              Escuchar en Vivo
            </ion-button>
            <div class="tags-container">
              <ion-chip v-for="tag in currentTags" :key="tag" :color="tag.color" outline>
                <ion-label>{{ tag.label }}</ion-label>
              </ion-chip>
            </div>
          </ion-card-content>
        </ion-card>
      </section>

      <section class="featured-shows ion-padding">
        <h2 class="ion-text-center">
          <ion-text color="light">Programas Destacados</ion-text>
        </h2>
        
        <ion-grid>
          <ion-row>
            <ion-col 
              v-for="show in featuredShows" 
              :key="show.id"
              size="12" 
              size-md="4"
            >
              <ion-card mode="ios" color="medium-dark" @click="navigateToShow(show.id)">
                <ion-badge v-if="show.live" color="danger">En Vivo</ion-badge>
                <ion-img 
                  :src="show.image" 
                  :alt="show.title"
                  loading="lazy"
                  width="100%"
                  height="150px"
                />
                
                <ion-card-header>
                  <ion-card-title>
                    <ion-text color="light">{{ show.title }}</ion-text>
                  </ion-card-title>
                  <ion-card-subtitle>
                    <ion-text color="tertiary">{{ show.time }}</ion-text>
                  </ion-card-subtitle>
                </ion-card-header>
                
                <ion-card-content>
                  <ion-button 
                    expand="block" 
                    fill="outline" 
                    color="tertiary" 
                    size="small"
                    :aria-label="`Ver más sobre ${show.title}`"
                  >
                    Ver más
                    <ion-icon :icon="arrowForward" slot="end"></ion-icon>
                  </ion-button>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </section>

      <section class="hosts-section ion-padding">
        <h2 class="ion-text-center">
          <ion-text color="light">Nuestros Conductores</ion-text>
        </h2>
        
        <ion-grid>
          <ion-row class="ion-justify-content-center">
            <ion-col 
              v-for="host in hosts" 
              :key="host.id"
              size="6" 
              size-md="3"
            >
              <div class="ion-text-center">
                <ion-avatar class="host-avatar">
                  <img 
                    :src="host.avatar" 
                    :alt="`Foto de ${host.name}`"
                    loading="lazy"
                    width="80"
                    height="80"
                  />
                </ion-avatar>
                <h3>
                  <ion-text color="light">{{ host.name }}</ion-text>
                </h3>
                <ion-chip color="medium" outline>
                  <ion-label>{{ host.show }}</ion-label>
                </ion-chip>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </section>

      <section class="social-section ion-padding">
        <h2 class="ion-text-center">
          <ion-text color="light">Síguenos en Redes</ion-text>
        </h2>
        
        <div class="ion-text-center ion-padding">
          <ion-button 
            v-for="social in socialLinks" 
            :key="social.name"
            fill="clear" 
            :color="social.color" 
            class="social-button"
            :aria-label="`Ir a ${social.name}`"
            @click="openSocial(social.url)"
          >
            <ion-icon :icon="social.icon" slot="icon-only"></ion-icon>
          </ion-button>
        </div>
      </section>
    </ion-content>

    <ion-tab-bar slot="bottom" color="dark" mode="ios">
      <ion-tab-button 
        v-for="tab in tabs" 
        :key="tab.name"
        :tab="tab.name" 
        :href="tab.route"
        :selected="tab.selected"
      >
        <ion-icon :icon="tab.icon"></ion-icon>
        <ion-label>{{ tab.label }}</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonContent, IonButton, IonIcon, IonText, IonCard, 
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonImg, IonChip, IonLabel, IonBadge, IonGrid, IonRow, IonCol, 
  IonAvatar, IonTabBar, IonTabButton 
} from '@ionic/vue';
import { ref } from 'vue';
import { playCircle, arrowForward } from 'ionicons/icons';

const featuredShows = ref([
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
]);

const hosts = ref([
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
]);

const socialLinks = ref([
  { 
    name: 'Instagram', 
    icon: 'logo-instagram', 
    color: 'instagram',
    url: 'https://instagram.com'
  },
  { 
    name: 'TikTok', 
    icon: 'logo-tiktok', 
    color: 'medium',
    url: 'https://tiktok.com'
  },
  { 
    name: 'Patreon', 
    icon: 'logo-patreon', 
    color: 'patreon',
    url: 'https://patreon.com'
  },
  { 
    name: 'Spotify', 
    icon: 'logo-spotify', 
    color: 'spotify',
    url: 'https://spotify.com'
  }
]);

const tabs = ref([
  { name: 'inicio', route: '/inicio', icon: 'home', label: 'Inicio', selected: true },
  { name: 'programas', route: '/programas', icon: 'list', label: 'Programas' },
  { name: 'en-vivo', route: '/en-vivo', icon: 'radio', label: 'En Vivo' },
  { name: 'contacto', route: '/contacto', icon: 'mail', label: 'Contacto' }
]);

const currentTags = ref([
  { label: '#Electrónica', color: 'primary' },
  { label: '#House', color: 'tertiary' }
]);

const playLiveStream = () => {
  // Implement live stream logic
};

const navigateToShow = (id: number) => {
  // Navigate to show details
};

const openSocial = (url: string) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.live-banner {
  background: linear-gradient(to bottom, var(--ion-color-dark) 0%, var(--ion-color-medium) 100%);
}

.tags-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
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
  transition: transform 0.2s ease;
  will-change: transform;
  cursor: pointer;
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

h2, h3 {
  margin: 0;
  font-weight: 500;
}

ion-img {
  object-fit: cover;
}
</style>