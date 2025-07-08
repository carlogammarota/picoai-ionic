import { defineStore } from 'pinia'
import { version } from 'vue';


export const useSystema = defineStore('systema', {
    state: () => ({
        direccion_seleccionada: null,
        ubicacion_actual: null,
        version: '1.0.0',
        ubicacion_actual_tiempo_real: null,
    }),
    actions: {
    },

    getters: {
        getUbicacionActual: (state) => state.ubicacion_actual,
        getUbicacionSeleccionada: (state) => state.direccion_seleccionada,
        getVersion: (state) => state.version,
        getUbicacionTiempoReal: (state) => state.ubicacion_actual_tiempo_real,
    },
    persist: true,
});
