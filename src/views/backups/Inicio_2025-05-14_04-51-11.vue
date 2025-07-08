<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="header">
        <ion-title>Aura Producciones - Radio Stream</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="main-content">
      <section class="player-section" aria-labelledby="player-heading">
        <h2 id="player-heading" class="visually-hidden">Reproductor de radio</h2>
        <div class="player-card glass-effect">
          <div class="visualizer"></div>
          <video 
            id="video2"
            class="stream-player"
            aria-label="Transmisión en vivo de Aura Producciones"
            autoplay
            muted
            playsinline
            controls
          ></video>
        </div>
      </section>

      <section class="schedule-section" aria-labelledby="schedule-heading">
        <h2 id="schedule-heading" class="section-title">Programación</h2>
        <ul class="schedule-list">
          <li 
            v-for="program in schedule" 
            :key="program.time"
            class="schedule-item"
            :class="{ 'live-item': program.live }"
          >
            <div class="schedule-time">{{ program.time }}</div>
            <div class="schedule-show">{{ program.show }}</div>
            <div v-if="program.live" class="live-badge" aria-label="En vivo">● LIVE</div>
          </li>
        </ul>
      </section>

      <section class="stats-section" aria-labelledby="stats-heading">
        <h2 id="stats-heading" class="visually-hidden">Estadísticas</h2>
        <div class="stats-grid">
          <article class="stat-card listeners-card">
            <h3 class="stat-title">Oyentes conectados</h3>
            <div class="stat-value">{{ listeners }}</div>
            <div class="progress-container">
              <div 
                class="progress-fill"
                :style="{ width: `${(listeners / maxListeners) * 100}%` }"
                role="progressbar"
                :aria-valuenow="listeners"
                aria-valuemin="0"
                :aria-valuemax="maxListeners"
              ></div>
            </div>
          </article>

          <article class="stat-card health-card">
            <h3 class="stat-title">Estado de la transmisión</h3>
            <div 
              class="health-indicator"
              :class="streamHealth.color"
              aria-live="polite"
            >
              {{ streamHealth.status }}
            </div>
          </article>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent
} from '@ionic/vue';

const stream2 = "https://live.auraproducciones.lat/stream/hls/playlist.m3u8";

// Programación
const schedule = [
  { time: '06:00 - 09:00', show: 'Aura Mañanero', live: true },
  { time: '09:00 - 12:00', show: 'Música sin Parar' },
  { time: '12:00 - 14:00', show: 'Noticias al Mediodía' },
  { time: '14:00 - 17:00', show: 'Tarde de Éxitos' },
  { time: '17:00 - 20:00', show: 'Aura Drive' },
  { time: '20:00 - 22:00', show: 'Noche de Jazz' }
];

// Estadísticas
const listeners = ref(1245);
const maxListeners = 5000;
const streamHealth = reactive({
  status: 'Excelente',
  color: 'success'
});

const setupHls = (videoElement: HTMLVideoElement, streamUrl: string) => {
  if (!videoElement) return;

  const loadStream = async () => {
    try {
      const response = await fetch(streamUrl, { method: 'GET', mode: 'cors' });
      if (response.ok) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamUrl);
          hls.attachMedia(videoElement);

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoElement.play().catch(err => console.error("Error reproduciendo:", err));
          });

          hls.on(Hls.Events.ERROR, (_, data) => {
            if (data.fatal) {
              console.error("Error fatal en el stream:", data);
            }
          });
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          videoElement.src = streamUrl;
          videoElement.addEventListener("loadedmetadata", () => {
            videoElement.play().catch(err => console.error("Error reproduciendo:", err));
          });
        }
      }
    } catch (error) {
      console.error("Error al verificar el stream:", error);
    }
  };

  loadStream();
};

onMounted(() => {
  const videoElement = document.getElementById("video2") as HTMLVideoElement;
  setupHls(videoElement, stream2);
});
</script>

<style scoped>
:root {
  --primary-color: #4a148c;
  --secondary-color: #8e24aa;
  --accent-color: #ff4081;
  --background-gradient: linear-gradient(135deg, #2c0367 0%, #6a11cb 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --transition-timing: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header {
  --background: var(--background-gradient);
  --color: var(--text-primary);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.main-content {
  --background: var(--background-gradient);
  padding: 1rem;
}

.player-section {
  margin-bottom: 2rem;
  animation: fadeIn 0.6s ease-out;
}

.player-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform var(--transition-timing);
}

.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.stream-player {
  width: 100%;
  height: 200px;
  object-fit: cover;
  opacity: 0.95;
  transition: opacity var(--transition-timing);
}

.stream-player:hover {
  opacity: 1;
}

.schedule-section {
  margin-bottom: 2rem;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
  border-left: 4px solid var(--accent-color);
}

.schedule-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.schedule-item {
  background: var(--glass-bg);
  backdrop-filter: blur(8px);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  transition: all var(--transition-timing);
  position: relative;
}

.schedule-item:hover {
  transform: translateX(8px);
  background: rgba(255, 255, 255, 0.15);
}

.schedule-time {
  color: var(--text-primary);
  font-weight: 600;
  min-width: 120px;
}

.schedule-show {
  color: var(--text-secondary);
  flex-grow: 1;
  margin: 0 1rem;
}

.live-badge {
  color: #ff4081;
  font-weight: 700;
  animation: pulse 1.5s infinite;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.live-badge::before {
  content: '●';
  font-size: 1.2em;
}

.stats-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.stat-card {
  background: var(--glass-bg);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(8px);
}

.stat-title {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.progress-container {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--accent-color);
  transition: width 0.8s ease-out;
}

.health-indicator {
  padding: 0.5rem 1rem;
  border-radius: 24px;
  display: inline-block;
  font-weight: 600;
}

.health-indicator.success {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>