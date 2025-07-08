// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const readline = require('readline');

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import readline from 'readline';


// Configuración
const API_KEY = 'sk-6dfdb79cd51f4fce93f8e74945751519'; // Reemplaza con tu API key real
const API_URL = 'https://api.deepseek.com/v1/images/generations'; // Verifica la URL correcta de la API

// Interfaz para leer input del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function generateImage(prompt) {
  try {
    console.log(`Generando imagen para: "${prompt}"...`);
    
    const response = await axios.post(API_URL, {
      prompt: prompt,
      n: 1, // Número de imágenes a generar
      size: "1024x1024", // Tamaño de la imagen
      // Puedes añadir más parámetros según la API lo permita
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Asumiendo que la API devuelve una URL de imagen o datos binarios
    // Esto puede variar según la implementación real de la API
    const imageUrl = response.data.data[0].url;
    
    // Descargar la imagen
    const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
    
    // Guardar la imagen
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `generated-image-${timestamp}.png`;
    const filepath = path.join(__dirname, filename);
    
    const writer = fs.createWriteStream(filepath);
    imageResponse.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filepath));
      writer.on('error', reject);
    });
    
  } catch (error) {
    console.error('Error al generar la imagen:', error.response?.data || error.message);
    throw error;
  }
}

// Solicitar prompt al usuario
rl.question('Ingresa el prompt para generar la imagen: ', async (prompt) => {
  try {
    const imagePath = await generateImage(prompt);
    console.log(`¡Imagen generada con éxito! Guardada en: ${imagePath}`);
  } catch (error) {
    console.error('No se pudo generar la imagen.');
  } finally {
    rl.close();
  }
});

rl.on('close', () => {
  process.exit(0);
});