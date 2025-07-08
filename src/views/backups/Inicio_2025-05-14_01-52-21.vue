<template>
  <ion-page>
    <ion-content :fullscreen="true" class="content">
      <section class="live-banner">
        <div class="card-container">
          <div class="card">
            <div class="image-container">
              <img 
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819" 
                alt="DJ en cabina"
                loading="lazy"
                class="card-image"
              />
              <div class="overlay"></div>
            </div>
            
            <div class="card-content">
              <h2 class="card-title">Transmisión en Vivo</h2>
              <p class="card-subtitle">Ahora sonando: DJ Aura - Session #124</p>
              
              <button 
                class="play-button"
                aria-label="Escuchar transmisión en vivo"
                @click="playLiveStream"
              >
                <span class="icon-wrapper">
                  <ion-icon :icon="playCircle"></ion-icon>
                </span>
                Escuchar en Vivo
              </button>
              
              <div class="tags-container">
                <span 
                  v-for="tag in currentTags" 
                  :key="tag" 
                  class="tag"
                  :style="{ '--tag-color': `var(--ion-color-${tag.color})` }"
                >
                  {{ tag.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="featured-shows">
        <h2 class="section-title">Programas Destacados</h2>
        
        <div class="shows-grid">
          <div 
            v-for="show in featuredShows" 
            :key="show.id"
            class="show-card"
            @click="navigateToShow(show.id)"
          >
            <div class="show-image-container">
              <img 
                :src="show.image" 
                :alt="show.title"
                loading="lazy"
                class="show-image"
              />
              <div class="show-overlay"></div>
              <span v-if="show.live" class="live-badge">En Vivo</span>
            </div>
            
            <div class="show-content">
              <h3 class="show-title">{{ show.title }}</h3>
              <p class="show-time">{{ show.time }}</p>
              
              <button 
                class="show-button"
                :aria-label="`Ver más sobre ${show.title}`"
              >
                Ver más
                <span class="button-icon">
                  <ion-icon :icon="arrowForward"></ion-icon>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="hosts-section">
        <h2 class="section-title">Nuestros Conductores</h2>
        
        <div class="hosts-grid">
          <div 
            v-for="host in hosts" 
            :key="host.id"
            class="host-card"
          >
            <div class="avatar-container">
              <img 
                :src="host.avatar" 
                :alt="`Foto de ${host.name}`"
                loading="lazy"
                class="host-avatar"
              />
            </div>
            <h3 class="host-name">{{ host.name }}</h3>
            <span class="host-show">{{ host.show }}</span>
          </div>
        </div>
      </section>

      <section class="social-section">
        <h2 class="section-title">Síguenos en Redes</h2>
        
        <div class="social-buttons">
          <button 
            v-for="social in socialLinks" 
            :key="social.name"
            class="social-button"
            :style="{ '--social-color': `var(--ion-color-${social.color})` }"
            :aria-label="`Ir a ${social.name}`"
            @click="openSocial(social.url)"
          >
            <ion-icon :icon="social.icon"></ion-icon>
          </button>
        </div>
      </section>
    </ion-content>

    <nav class="tab-bar">
      <div 
        v-for="tab in tabs" 
        :key="tab.name"
        class="tab-button"
        :class="{ 'active': tab.selected }"
      >
        <ion-icon :icon="tab.icon" class="tab-icon"></ion-icon>
        <span class="tab-label">{{ tab.label }}</span>
      </div>
    </nav>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonContent, IonIcon } from '@ionic/vue';
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
.content {
  --background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding-bottom: 80px;
}

/* Live Banner */
.live-banner {
  padding: 20px;
}

.card-container {
  perspective: 1000px;
}

.card {
  background: rgba(30, 30, 50, 0.7);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.5s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .card-image {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
}

.card-content {
  padding: 20px;
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
}

.card-subtitle {
  font-size: 0.9rem;
  color: var(--ion-color-tertiary);
  margin-bottom: 20px;
  opacity: 0.9;
}

.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background: var(--ion-color-primary);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(var(--ion-color-primary-rgb), 0.3);
}

.play-button:hover {
  background: var(--ion-color-primary-shade);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--ion-color-primary-rgb), 0.4);
}

.play-button:active {
  transform: translateY(0);
}

.icon-wrapper {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.tags-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.tag {
  padding: 6px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--tag-color);
  border: 1px solid var(--tag-color);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(var(--tag-color), 0.1);
}

/* Featured Shows */
.featured-shows {
  padding: 20px;
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: white;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--ion-color-primary);
  margin: 10px auto 0;
  border-radius: 3px;
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.show-card {
  background: rgba(30, 30, 50, 0.7);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.show-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.show-image-container {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.show-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.show-card:hover .show-image {
  transform: scale(1.05);
}

.show-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
}

.live-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--ion-color-danger);
  color: white;
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 2;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}

.show-content {
  padding: 15px;
}

.show-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
}

.show-time {
  font-size: 0.85rem;
  color: var(--ion-color-tertiary);
  margin-bottom: 15px;
}

.show-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px;
  background: transparent;
  color: var(--ion-color-tertiary);
  border: 1px solid var(--ion-color-tertiary);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.show-button:hover {
  background: rgba(var(--ion-color-tertiary-rgb), 0.1);
  color: white;
  border-color: white;
}

.button-icon {
  margin-left: 5px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.show-button:hover .button-icon {
  transform: translateX(3px);
}

/* Hosts Section */
.hosts-section {
  padding: 20px;
}

.hosts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.host-card {
  text-align: center;
  transition: all 0.3s ease;
}

.host-card:hover {
  transform: translateY(-5px);
}

.avatar-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 15px;
}

.host-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--ion-color-tertiary);
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.host-card:hover .host-avatar {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.host-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
}

.host-show {
  display: inline-block;
  font-size: 0.8rem;
  color: var(--ion-color-medium);
  padding: 4px 10px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.host-card:hover .host-show {
  background: rgba(var(--ion-color-tertiary-rgb), 0.2);
  color: var(--ion-color-tertiary);
}

/* Social Section */
.social-section {
  padding: 20px;
  margin-bottom: 20px;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.social-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--social-color);
  color: var(--social-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-button:hover {
  background: var(--social-color);
  color: white;
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 5px 15px rgba(var(--social-color), 0.3);
}

.social-button:active {
 