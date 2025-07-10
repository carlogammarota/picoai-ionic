// menuStore.ts
import { reactive, onMounted, onUnmounted } from 'vue';
import { menuController } from '@ionic/vue';

export const useMenuStore = () => {
  const state = reactive({
    isOpen: false,
  });

  const openMenu = async () => {
    await menuController.open();
    state.isOpen = true;
    console.log('Menu opened');
  };

  const closeMenu = async () => {
    await menuController.close();
    state.isOpen = false;
    console.log('Menu closed', state.isOpen);
  };

  // Escuchar evento de cambio de ruta para cerrar el menú
  const onRouteChange = async () => {
    await closeMenu();
  };

  onMounted(() => {
    window.addEventListener('ionRouteDidChange', onRouteChange);
  });

  onUnmounted(() => {
    window.removeEventListener('ionRouteDidChange', onRouteChange);
  });

  return {
    state,
    openMenu,
    closeMenu,
  };
};
