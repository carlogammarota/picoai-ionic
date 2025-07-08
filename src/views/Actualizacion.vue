<template>
  <div class="update-container">
    <div class="update-card">
      <div class="update-header">
        <svg class="update-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21,12A9,9 0 0,0 12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12M12,17L7,12H10V8H14V12H17L12,17Z" />
        </svg>
        <h1>¡Nueva Actualización Disponible!</h1>
      </div>
      
      <div class="update-body">
        <p>Para continuar usando la aplicación, debes instalar la última versión.</p>
        <p class="update-features">Novedades en esta versión:</p>
        <ul class="feature-list">
          <li>Mejoras de rendimiento</li>
          <li>Nuevas funcionalidades</li>
          <li>Corrección de errores</li>
          <li>Mayor seguridad</li>
        </ul>
      </div>
      
      <div class="update-footer">
        <button class="update-button" @click="updateApp">
          Actualizar Ahora
        </button>
        <p class="update-note">Esta actualización es obligatoria para continuar</p>
      </div>
    </div>
  </div>
</template>
<!-- <script>
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Http } from '@capacitor/http';


export default {
  methods: {
    async updateApp() {
  const url = 'https://api.auraproducciones.lat/actualizacion';
  const token = localStorage.getItem('token');

  try {
    const response = await Http.downloadFile({
      url: url,
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      filePath: 'actualizacion.apk',
      fileDirectory: Directory.Documents
    });

    const path = response.path;

    // Abrir el archivo con plugin nativo (como File Opener o Intent)
    alert('Archivo descargado en: ' + path);
  } catch (error) {
    console.error('Error al descargar el APK:', error);
    alert('No se pudo descargar la actualización');
  }
}
  }
}
</script> -->


<style>
.update-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.update-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  max-width: 450px;
  margin-top: -70px;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.5s ease-in-out;
}

.update-header {
  padding: 30px 20px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
}

.update-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 15px;
  animation: bounce 2s infinite;
}

.update-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.update-body {
  padding: 25px;
  color: #555;
}

.update-features {
  font-weight: 600;
  margin-top: 20px;
  color: #333;
}

.feature-list {
  text-align: left;
  padding-left: 20px;
  margin: 15px 0;
}

.feature-list li {
  margin-bottom: 8px;
  position: relative;
  list-style-type: none;
  padding-left: 25px;
}

.feature-list li:before {
  content: "✓";
  color: #6e8efb;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.update-footer {
  padding: 0 25px 25px;
}

.update-button {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(110, 142, 251, 0.4);
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.update-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(110, 142, 251, 0.6);
}

.update-button:active {
  transform: translateY(0);
}

.update-note {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-15px); }
  60% { transform: translateY(-7px); }
}
</style>