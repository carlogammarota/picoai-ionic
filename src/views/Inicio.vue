<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding ">
      <ion-grid>
        <ion-row>
          <ion-col size="12" size-md="6" size-lg="4" class="ion-text-center px-4">
            <ion-card class="ai-card pink-border">
              <div class="badge pink">
                <ion-icon name="image"></ion-icon> AI Art
              </div>
              <img src="@/assets/image_generator.png" />
              <ion-card-header>
                <ion-card-title class="gradient-text-pink">AI Image Generator</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>Create stunning, high-resolution images from text prompts in seconds.</p>
                <ion-button expand="block" color="medium" router-link="https://picoai.app/models/imagen_generator/">
                  <ion-icon name="brush" slot="start"></ion-icon>
                  Generate Art
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="12" size-md="6" size-lg="4" class="ion-text-center px-4 py-4">
            <ion-card class="ai-card cyan-border">
              <div class="badge amber">
                <ion-icon name="create"></ion-icon> Editor
              </div>
              <!-- <ImgComparison
                class="comparison-img"
                :images="imageList"
              /> -->
              <img src="@/assets/image_generator.png" />
              <ion-card-header>
                <ion-card-title class="gradient-text-cyan">AI Image Editor</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>Transform ordinary images into extraordinary visuals with AI-powered enhancements.</p>
                <ion-button expand="block" color="medium" router-link="https://picoai.app/models/edit-image/">
                  <ion-icon name="color-wand" slot="start"></ion-icon>
                  Edit Image
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <!-- Puedes replicar este ion-col para los demás modelos siguiendo el mismo formato -->
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/vue';
// import ImgComparison from '@/components/ImgComparison.vue';
import { ref, onMounted } from 'vue';

const imageList = ref([
  'https://fal.media/files/tiger/7dSJbIU_Ni-0Zp9eaLsvR_fe56916811d84ac69c6ffc0d32dca151.jpg',
  'https://v3.fal.media/files/rabbit/rmgBxhwGYb2d3pl3x9sKf_output.png',
]);

const currentIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % imageList.value.length;
  }, 2000);
});
</script>

<style scoped>
.ai-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

.pink-border {
  border: 1px solid rgba(255, 0, 128, 0.2);
}
.cyan-border {
  border: 1px solid rgba(0, 255, 255, 0.2);
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.badge.pink {
  background: linear-gradient(to right, #ec4899, #f43f5e);
  color: white;
}

.badge.amber {
  background: linear-gradient(to right, #fbbf24, #f97316);
  color: black;
}

.gradient-text-pink {
  background: linear-gradient(to right, #f472b6, #fb7185);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-cyan {
  background: linear-gradient(to right, #22d3ee, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.comparison-img {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
}
</style>