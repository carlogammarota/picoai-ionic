<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h1>Content</h1>
    </ion-content>
    <ion-footer class="ion-no-border">
      <ion-toolbar>
        <ion-title>Footer</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
  import { IonContent, IonFooter, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonPage, IonContent, IonFooter, IonTitle, IonToolbar },
  });
</script>
