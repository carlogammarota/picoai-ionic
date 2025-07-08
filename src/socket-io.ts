// @/socket-io.ts
// import { pinia } from '@/main' 
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

import { useAuthStore } from '@/stores/auth'


export const connectSocket = async () => {

  // const auth = await useAuthStore();
  const auth = await useAuthStore()
  if (!socket) {
    // const counter = useCounterStore();
    socket = io("https://segundo-socket.auraproducciones.lat/", {
      query: {
        id_feathers: auth.id_feathers, // por ejemplo, si querés enviar un token de auth
        // nombre: 'usuario123', // por ejemplo, si querés enviar un token de auth
        // tipo: auth.tipo, // por ejemplo, si querés enviar un token de auth
      }
    });

    socket.on("connect", () => {
      console.log("✅ Conectado al servidor:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado del servidor");
    });

    socket.on("push-notification", (data: { title: string; message: string }) => {
      console.log("🔔 Notificación recibida:", data);
      new Notification(data.title, {
        body: data.message,
        icon: "https://i.postimg.cc/QMjQTDKh/ionic-dark-logo-blue.png",
      });
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => socket;
