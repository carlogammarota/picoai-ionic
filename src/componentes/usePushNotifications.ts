import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


// import { App } from '@capacitor/app';



// import { connectSocket, getSocket } from "@/socket-io";
import { useAuthStore } from '@/stores/auth';

export const usePushNotifications = () => {
  const initPush = async () => {
    if (!Capacitor.isNativePlatform()) {
      console.log("🖥️ Plataforma web detectada, notificaciones push deshabilitadas");
      return;
    }

    
  
    const auth = useAuthStore();
  
    try {
      const permissionStatus = await PushNotifications.checkPermissions();



      // if (permissionStatus.receive === 'denied') {
      //   if (Capacitor.getPlatform() === 'ios') {
      //     const openSettings = confirm("Las notificaciones están desactivadas. ¿Querés abrir la configuración?");
      //     if (openSettings) {
      //       App.openSettings(); // Abre Ajustes > Tu App
      //     }
      //   }
      // }
  
      if (permissionStatus.receive !== 'granted') {
        const requestStatus = await PushNotifications.requestPermissions();
        if (requestStatus.receive !== 'granted') {
          console.error("❌ Permiso de notificaciones denegado");
          return;
        }
      }
  
      console.log("✅ Permiso de notificaciones concedido");
      await PushNotifications.register();
  
    } catch (err) {
      console.error("❌ Error verificando permisos de notificaciones", err);
    }
  
    // Token recibido
    PushNotifications.addListener('registration', (token: Token) => {
      console.info("📲 Token recibido:", token.value);

  
      fetch("https://segundo-socket.auraproducciones.lat/suscribir-topic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token.value,
          topic: "todos",
          id_feathers: auth.id_feathers,
        }),
      });
    });
  
    // Error de registro
    PushNotifications.addListener('registrationError', (error) => {
      console.error('❌ Error de registro de notificaciones:', error);
    });
  
    // Notificación recibida
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('📥 Notificación recibida:', notification);
    });
  
    // Notificación tocada
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('👆 Notificación tocada:', notification);
    });
  };
  

  return { initPush };
};
