// feathersClient.ts
import { feathers } from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import authentication from '@feathersjs/authentication-client'; // Importación faltante

const API_URL = "https://api.auraproducciones.lat/"; // Cambia esto por la URL de tu API
// Crear cliente REST
const client = feathers();

// Configurar el plugin REST
client.configure(
  rest(API_URL).fetch(window.fetch.bind(window))
);

// Configurar autenticación (opcional)
client.configure(
  authentication({
    storage: window.localStorage,
    storageKey: 'feathers-jwt'
  })
);

export default client;