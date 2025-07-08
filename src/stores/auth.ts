import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    count: 0,
    token_feathers: "",
    id_feathers: "",
    tipo: "",
    user: {},
    isAuthenticated: false,
    isLoading: false,
    menu: false
  }),
  actions: {
    increment() {
      this.count++
    },
    logout() {
      this.token_feathers = "";
      this.id_feathers = "";
      this.tipo = "";
      this.user = {};
      this.isAuthenticated = false;
    }
  },
    getters: {
        doubleCount: (state) => state.count * 2,
        getFeathersId: (state) => state.id_feathers,
        getFeathersToken: (state) => state.token_feathers,
        getTipo: (state) => state.tipo,
        getUser: (state) => state.user,
        getIsAuthenticated: (state) => state.isAuthenticated,
    },
    persist: true,
});
