// menuStore.ts
import { reactive } from 'vue';

export const useMenuStore = () => {
  const state = reactive({
    isOpen: false,
  });

  const openMenu = () => {
    state.isOpen = true;
    console.log('Menu opened');
  };

  const closeMenu = () => {
    state.isOpen = false;
    console.log('Menu closed');
  };

  return {
    state,
    openMenu,
    closeMenu,
  };
};
