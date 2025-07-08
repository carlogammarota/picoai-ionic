```vue
<template>
  <ion-page>
    <ion-content :fullscreen="true" class="main-content">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-title">Radio <span class="highlight">Fusion</span></h1>
          <p class="hero-subtitle">Tu conexión con la mejor música</p>
          
          <div class="live-indicator pulse">
            <span class="live-dot"></span>
            <span>EN VIVO</span>
          </div>
          
          <ion-button class="play-button" shape="round">
            <ion-icon :icon="playCircleOutline" slot="start"></ion-icon>
            Escuchar Ahora
          </ion-button>
        </div>
      </section>

      <!-- Shows Section -->
      <section class="shows-section">
        <h2 class="section-title">Programas Destacados</h2>
        
        <div class="shows-grid">
          <div 
            v-for="show in featuredShows" 
            :key="show.id" 
            class="show-card"
            :class="{'live': show.live}"
          >
            <div class="show-image" :style="{'background-image': `url(${show.image})`}">
              <span v-if="show.live" class="live-badge">LIVE</span>
            </div>
            <div class="show-info">
              <h3>{{ show.title }}</h3>
              <p>{{ show.time }}</p>
              <ion-button fill="clear" class="show-button">
                Ver detalles
                <ion-icon :icon="arrowForwardOutline"></ion-icon>
              </ion-button>
            </div>
          </div>
        </div>
      </section>

      <!-- Hosts Section -->
      <section class="hosts-section">
        <h2 class="section-title">Nuestros DJs</h2>
        
        <div class="hosts-carousel">
          <div 
            v-for="host in hosts" 
            :key="host.id" 
            class="host-card"
          >
            <div class="host-avatar">
              <img :src="host.avatar" :alt="host.name">
            </div>
            <div class="host-info">
              <h3>{{ host.name }}</h3>
              <p>{{ host.show }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Social Section -->
      <section class="social-section">
        <h2 class="section-title">Conéctate con Nosotros</h2>
        
        <div class="social-icons">
          <a v-for="(icon, index) in socialIcons" 
             :key="index" 
             :href="icon.link" 
             target="_blank"
             class="social-icon"
             :style="{'--icon-color': icon.color}"
          >
            <ion-icon :icon="icon.icon"></ion-icon>
          </a>
        </div>
      </section>
    </ion-content>

    <!-- Navigation -->
    <nav class="bottom-nav">
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        class="nav-item"
        active-class="active"
      >
        <ion-icon :icon="item.icon"></ion-icon>
        <span>{{ item.label }}</span>
      </router-link>
    </nav>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonContent, IonButton, IonIcon 
} from '@ionic/vue';
import { 
  playCircleOutline, arrowForwardOutline,
  homeOutline, listOutline, radioOutline, mailOutline,
} from 'ionicons/icons';

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
  }
];

const socialIcons = [
];

const navItems = [
  { path: '/', icon: homeOutline, label: 'Inicio' },
  { path: '/shows', icon: listOutline, label: 'Programas' },
  { path: '/live', icon: radioOutline, label: 'En Vivo' },
  { path: '/contact', icon: mailOutline, label: 'Contacto' }
];
</script>

<style scoped>
.main-content {
  --background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding-bottom: 80px;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 60vh;
  background: url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 20px;
  max-width: 800px;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.highlight {
  color: #4cc9f0;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 0, 0, 0.2);
  padding: 8px 15px;
  border-radius: 20px;
  margin-bottom: 2rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.live-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  margin-right: 8px;
  animation: pulse 1.5s infinite;
}

.play-button {
  --background: #4cc9f0;
  --background-activated: #3aa8d8;
  --color: white;
  font-weight: 600;
  padding: 0 30px;
  height: 50px;
}

/* Shows Section */
.section-title {
  text-align: center;
  font-size: 2rem;
  margin: 2rem 0;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background: #4cc9f0;
  margin: 10px auto 0;
}

.shows-section {
  padding: 0 20px;
}

.shows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 2rem;
}

.show-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.show-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.show-image {
  height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.live-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: red;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.show-info {
  padding: 20px;
}

.show-info h3 {
  margin: 0 0 5px;
  font-size: 1.3rem;
}

.show-info p {
  margin: 0 0 15px;
  color: #a1a1a1;
  font-size: 0.9rem;
}

.show-button {
  --color: #4cc9f0;
  --padding-start: 0;
  --padding-end: 0;
  font-size: 0.9rem;
}

/* Hosts Section */
.hosts-section {
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 40px;
}

.hosts-carousel {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
  scroll-snap-type: x mandatory;
}

.host-card {
  flex: 0 0 200px;
  scroll-snap-align: start;
  text-align: center;
}

.host-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
  border: 3px solid #4cc9f0;
}

.host-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.host-info h3 {
  margin: 10px 0 5px;
  font-size: 1.1rem;
}

.host-info p {
  margin: 0;
  color: #a1a1a1;
  font-size: 0.9rem;
}

/* Social Section */
.social-section {
  padding: 40px 20px;
  text-align: center;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.social-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--icon-color);
  transform: translateY(-3px);
}

/* Navigation */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background: rgba(26, 26, 46, 0.9);
  backdrop-filter: blur(10px);
  padding: 10px 0;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a1a1a1;
  text-decoration: none;
  font-size: 0.8rem;
  padding: 5px 10px;
  transition: color 0.3s ease;
}

.nav-item ion-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.nav-item.active {
  color: #4cc9f0;
}

/* Animations */
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.pulse {
  animation: pulse 2s infinite;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .shows-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```