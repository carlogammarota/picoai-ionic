
<template>
    <ion-page>
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title class="px-8 text-white">Aura Producciones - Radio Stream</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content :fullscreen="true" class="ion-padding p-4">
        <!-- Player de Radio -->
        <div class="player-container">
          <ion-card>
        
            
            <ion-card-content>
           
              <video 
        id="video2"
        style="width: 100%;" 
        autoplay 
        muted 
        playsinline
        controls>
      </video>
            </ion-card-content>
          </ion-card>
        </div>
        
        <!-- Programación -->
        <ion-list>
          <ion-list-header>
            <ion-label>Programación</ion-label>
          </ion-list-header>
          
          <ion-item v-for="program in schedule" :key="program.time">
            <ion-label>
              <h3>{{ program.time }}</h3>
              <p>{{ program.show }}</p>
            </ion-label>
            <ion-badge slot="end" color="primary" v-if="program.live">EN VIVO</ion-badge>
          </ion-item>
        </ion-list>
        
        <!-- Estadísticas -->
        <ion-grid>
          <ion-row>
            <ion-col size="6">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Oyentes</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <h2>{{ listeners }}</h2>
                  <ion-progress-bar :value="listeners / maxListeners"></ion-progress-bar>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col size="6">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Stream Health</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <ion-chip :color="streamHealth.color">
                    <ion-label>{{ streamHealth.status }}</ion-label>
                  </ion-chip>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { 
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonButton, IonIcon, IonRange, IonList, IonListHeader, IonItem, IonLabel,
    IonBadge, IonGrid, IonRow, IonCol, IonProgressBar, IonChip
  } from '@ionic/vue';
  import { play, pause, stop, volumeLow, volumeHigh } from 'ionicons/icons';
  
  // Configuración del stream
  const streamUrl = 'https://your-radio-stream-url.com/live.mp3';
  const audioPlayer = ref<HTMLAudioElement | null>(null);
  const isPlaying = ref(false);
  const volume = ref(0.7);
  
  // Datos del track actual
  const currentTrack = reactive({
    title: 'Canción Actual',
    artist: 'Artista Desconocido'
  });
  
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
  
  // Métodos del player
  const togglePlay = () => {
    if (!audioPlayer.value) return;
    
    if (isPlaying.value) {
      audioPlayer.value.pause();
    } else {
      audioPlayer.value.play();
    }
  };
  
  const stop = () => {
    if (!audioPlayer.value) return;
    
    audioPlayer.value.pause();
    audioPlayer.value.currentTime = 0;
    isPlaying.value = false;
  };
  
  const volumeUp = () => {
    if (volume.value < 1) volume.value += 0.1;
    setAudioVolume();
  };
  
  const volumeDown = () => {
    if (volume.value > 0) volume.value -= 0.1;
    setAudioVolume();
  };
  
  const setVolume = (event: CustomEvent) => {
    volume.value = event.detail.value;
    setAudioVolume();
  };
  
  const setAudioVolume = () => {
    if (audioPlayer.value) {
      audioPlayer.value.volume = volume.value;
    }
  };
  
  const onPlay = () => {
    isPlaying.value = true;
    // Simular cambio de canción (en una app real, esto vendría de una API)
    currentTrack.title = 'Nueva Canción';
    currentTrack.artist = 'Artista Popular';
  };
  
  const onPause = () => {
    isPlaying.value = false;
  };

  import { onMounted } from "vue";
  import Contenido from "@/componentes/Contenido.vue";
  const stream2 = "https://live.auraproducciones.lat/stream/hls/playlist.m3u8";
  
  const setupHls = (videoElement, streamUrl) => {
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
        } else {
          console.log("Stream no disponible.");
        }
      } catch (error) {
        console.error("Error al verificar el stream:", error);
      }
    };
  
    loadStream();
  };
  
  onMounted(() => {
    setupHls(document.getElementById("video2"), stream2);
  });
  </script>
  
  <style scoped>
  .player-container {
    margin-bottom: 20px;
  }
  
  .now-playing {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .album-art {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin-right: 15px;
  }
  
  .track-info {
    flex: 1;
  }
  
  .player-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .player-controls ion-range {
    flex: 1;
  }
  
  ion-progress-bar {
    margin-top: 10px;
  }
  </style>
  
 
  