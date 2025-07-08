<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="header-title">Aura Producciones - Radio Stream</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <main class="container">
        <!-- Player Section -->
        <section class="player-section" aria-labelledby="player-heading">
          <h2 id="player-heading" class="visually-hidden">Reproductor en vivo</h2>
          <div class="player-card">
            <div class="visualizer-container">
              <div class="audio-visualizer"></div>
              <video 
                id="video2"
                class="stream-player"
                aria-label="Transmisión en vivo"
                autoplay
                muted
                playsinline
                controls
              ></video>
            </div>
          </div>
        </section>

        <!-- Schedule Grid -->
        <section class="schedule-section" aria-labelledby="schedule-heading">
          <div class="section-header">
            <h2 id="schedule-heading" class="section-title">Programación</h2>
            <div class="current-time">20:45 - En vivo</div>
          </div>
          
          <ul class="schedule-grid">
            <li 
              v-for="(program, index) in schedule"
              :key="index"
              class="schedule-card"
              :class="{ 'active': program.live }"
              :aria-current="program.live ? 'time' : null"
            >
              <time class="program-time">{{ program.time }}</time>
              <h3 class="program-title">{{ program.show }}</h3>
              <div v-if="program.live" class="live-indicator" aria-live="polite">
                <span class="pulse-dot"></span>
                <span class="live-text">ON AIR</span>
              </div>
            </li>
          </ul>
        </section>

        <!-- Stats Dashboard -->
        <section class="stats-section" aria-labelledby="stats-heading">
          <h2 id="stats-heading" class="visually-hidden">Estadísticas</h2>
          <div class="stats-grid">
            <article class="stat-card listeners-card">
              <div class="stat-header">
                <h3 class="stat-title">Oyentes activos</h3>
                <div class="stat-value">{{ formattedListeners }}</div>
              </div>
              <div class="progress-track">
                <div 
                  class="progress-bar"
                  :style="{ '--progress': `${(listeners / maxListeners) * 100}%` }"
                  role="progressbar"
                  :aria-valuenow="listeners"
                  aria-valuemin="0"
                  :aria-valuemax="maxListeners"
                ></div>
              </div>
              <div class="stat-footer">Capacidad: {{ maxListeners }} oyentes</div>
            </article>

            <article class="stat-card health-card">
              <div class="health-status" :class="streamHealth.color">
                <div class="status-icon"></div>
                <div class="status-details">
                  <span class="status-label">Estado:</span>
                  <span class="status-value">{{ streamHealth.status }}</span>
                </div>
              </div>
              <div class="connection-quality">
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
                <div class="quality-bar"></div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

const streamUrl = "https://live.auraproducciones.lat/stream/hls/playlist.m3u8";

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
const streamHealth = ref({
  status: 'Excelente',
  color: 'success'
});

const formattedListeners = computed(() => {
  return new Intl.NumberFormat('es-ES').format(listeners.value);
});

const setupHls = (videoElement: HTMLVideoElement, streamUrl: string) => {
  // Mantener implementación existente
};
</script>

<style scoped>
.container {
  --primary-accent: hsl(270, 80%, 60%);
  --active-color: hsl(334, 100%, 65%);
  --background-base: hsl(260, 30%, 12%);
  --glass-background: rgba(255, 255, 255, 0.05);
  --text-primary: rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
  padding: 1.5rem;
  background: var(--background-base);
  min-height: 100%;
}

.header-title {
  font-weight: 600;
  letter-spacing: -0.025em;
  background: linear-gradient(45deg, var(--primary-accent), hsl(280, 80%, 60%));
  -webkit-background-clip: text;
  background-clip: text;
  color: black;
}

.player-section {
  margin-bottom: 2.5rem;
  animation: cardEntrance 0.6s var(--transition-easing);
}

.player-card {
  background: var(--glass-background);
  backdrop-filter: blur(24px);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s var(--transition-easing);
}

.player-card:hover {
  transform: translateY(-2px);
}

.visualizer-container {
  position: relative;
  padding-top: 56.25%;
}

.audio-visualizer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(106, 17, 203, 0.2), rgba(74, 20, 140, 0.4));
  opacity: 0.8;
  animation: visualizerPulse 2s infinite alternate;
}

.stream-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.95;
  transition: opacity 0.3s ease;
}

.schedule-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  color: var(--text-primary);
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 1.25em;
  width: 3px;
  background: var(--active-color);
  border-radius: 2px;
}

.current-time {
  color: var(--active-color);
  font-weight: 500;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 64, 129, 0.1);
  border-radius: 1rem;
}

.schedule-grid {
  display: grid;
  gap: 1rem;
}

.schedule-card {
  position: relative;
  background: var(--glass-background);
  padding: 1.25rem;
  border-radius: 1rem;
  backdrop-filter: blur(12px);
  transition: all 0.3s var(--transition-easing);
  border: 1px solid transparent;
}

.schedule-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(8px);
}

.schedule-card.active {
  border-color: var(--active-color);
  background: linear-gradient(
    to right,
    rgba(255, 64, 129, 0.1),
    rgba(106, 17, 203, 0.05)
  );
}

.program-time {
  display: block;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.program-title {
  color: var(--text-primary);
  font-weight: 500;
  margin: 0;
}

.live-indicator {
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: var(--active-color);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 64, 129, 0.3);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: livePulse 1.5s infinite;
}

.stats-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.stat-card {
  background: var(--glass-background);
  padding: 1.5rem;
  border-radius: 1.25rem;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.listeners-card .progress-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress-bar {
  height: 100%;
  background: var(--active-color);
  width: var(--progress);
  transition: width 1s var(--transition-easing);
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: rgba(255, 255, 255, 0.3);
}

.health-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--status-color, #4caf50);
  box-shadow: 0 0 12px var(--status-color, #4caf50);
}

.health-status.success { --status-color: #4caf50; }
.health-status.warning { --status-color: #ffc107; }
.health-status.error { --status-color: #f44336; }

.connection-quality {
  display: flex;
  gap: 4px;
  margin-top: 1.5rem;
}

.quality-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.quality-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: var(--bar-width, 60%);
  background: var(--status-color);
  transition: width 0.6s ease;
}

@keyframes cardEntrance {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes livePulse {
  0% { opacity: 0.6; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.6; transform: scale(0.9); }
}

@keyframes visualizerPulse {
  from { opacity: 0.4; }
  to { opacity: 0.8; }
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