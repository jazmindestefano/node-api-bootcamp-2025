# Para qué sirve Node.js

Node.js es como un "intérprete" que permite ejecutar JavaScript fuera del navegador, principalmente para crear servidores web.

## ¿Qué es?

### Node.js:
- **Runtime de JavaScript** (entorno de ejecución)
- **Permite ejecutar JavaScript** en el servidor
- **Basado en el motor V8** de Google Chrome
- **Ideal para APIs** y aplicaciones web

### Analogía simple:
Node.js es como un "traductor" que convierte JavaScript (que normalmente solo funciona en navegadores) para que también funcione en servidores.

## ¿Por qué existe?

### El problema antes de Node.js:
- **JavaScript solo funcionaba** en navegadores
- **Para servidores** necesitabas otros lenguajes (PHP, Python, Java)
- **Diferentes lenguajes** para frontend y backend
- **Más complejidad** para los desarrolladores

### La solución de Node.js:
- **Un solo lenguaje** (JavaScript) para todo
- **JavaScript en el servidor** y en el navegador
- **Menos complejidad** para los desarrolladores
- **Comunidad grande** y muchas librerías

## ¿Cómo funciona?

### 1. **Motor V8**:
- **Motor de JavaScript** de Google Chrome
- **Convierte JavaScript** a código máquina
- **Muy rápido** y optimizado

### 2. **Event Loop** (Bucle de eventos):
- **Maneja operaciones** de forma asíncrona
- **No bloquea** el servidor
- **Puede manejar** muchas conexiones simultáneas

### 3. **NPM** (Node Package Manager):
- **Gestor de paquetes** para JavaScript
- **Miles de librerías** disponibles
- **Fácil instalación** de dependencias

## Características principales:

### 1. **Asíncrono y No Bloqueante**:
```javascript
// ❌ Código bloqueante (lento)
const data = fs.readFileSync('archivo.txt');  // Espera a leer el archivo
console.log('Archivo leído');

// ✅ Código asíncrono (rápido)
fs.readFile('archivo.txt', (err, data) => {
  console.log('Archivo leído');
});
console.log('Esto se ejecuta inmediatamente');
```

### 2. **Event-Driven** (Basado en eventos):
```javascript
const http = require('http');

// Escuchar el evento 'request'
server.on('request', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hola Mundo');
});
```

### 3. **Single Thread** (Un solo hilo):
- **Un solo hilo** maneja todas las peticiones
- **Event Loop** distribuye el trabajo
- **Muy eficiente** para operaciones I/O

## Ventajas de Node.js:

### ✅ **Rápido**:
- **Motor V8** muy optimizado
- **Asíncrono** no bloquea el servidor
- **Ideal para APIs** con muchas peticiones

### ✅ **JavaScript en todas partes**:
- **Mismo lenguaje** para frontend y backend
- **Compartir código** entre cliente y servidor
- **Menos curva de aprendizaje**

### ✅ **Ecosistema grande**:
- **NPM** con miles de paquetes
- **Comunidad activa**
- **Muchas librerías** para cualquier cosa

### ✅ **Escalable**:
- **Maneja muchas conexiones** simultáneas
- **Microservicios** fáciles de crear
- **Horizontal scaling** (más servidores)

## Desventajas de Node.js:

### ❌ **No ideal para CPU intensivo**:
- **Un solo hilo** para procesamiento
- **Mejor para I/O** que para cálculos pesados
- **Para cálculos pesados** usar otros lenguajes

### ❌ **Callbacks** (antes):
- **Callback hell** con código anidado
- **Difícil de leer** y mantener
- **Ahora se usa async/await**

## Casos de uso ideales:

### ✅ **APIs REST**:
```javascript
app.get('/api/usuarios', (req, res) => {
  res.json({ usuarios: ['Juan', 'María'] });
});
```

### ✅ **Aplicaciones en tiempo real**:
- **Chats** en vivo
- **Juegos** multijugador
- **Notificaciones** push

### ✅ **Microservicios**:
- **Servicios pequeños** y especializados
- **Fácil de escalar**
- **Comunicación** entre servicios

### ✅ **Herramientas de desarrollo**:
- **Build tools** (Webpack, Vite)
- **Linters** (ESLint)
- **Testing** (Jest)

## Casos de uso NO ideales:

### ❌ **Aplicaciones CPU intensivas**:
- **Procesamiento de imágenes** pesado
- **Cálculos matemáticos** complejos
- **Algoritmos** de machine learning

### ❌ **Aplicaciones de escritorio**:
- **Mejor usar** Electron o aplicaciones nativas
- **Node.js** es principalmente para servidores

## Estructura de un proyecto Node.js:

```
mi-proyecto/
├── package.json          # Configuración del proyecto
├── package-lock.json     # Versiones exactas
├── node_modules/         # Dependencias instaladas
├── index.js             # Archivo principal
├── .env                 # Variables de entorno
└── docs/                # Documentación
```

## Ejemplo básico de servidor:

```javascript
// index.js
const http = require('http');

// Crear servidor
const server = http.createServer((req, res) => {
  // Configurar headers
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  
  // Responder con JSON
  res.end(JSON.stringify({
    mensaje: 'Hola desde Node.js',
    timestamp: new Date().toISOString()
  }));
});

// Escuchar en puerto 3000
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
```

## Con Express (más fácil):

```javascript
// index.js
import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
  res.json({ mensaje: 'Hola desde Express' });
});

app.get('/api/usuarios', (req, res) => {
  res.json({ usuarios: ['Juan', 'María'] });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor Express corriendo en puerto 3000');
});
```

## Comandos básicos:

### Instalación:
```bash
# Instalar Node.js (desde nodejs.org)
# Verificar instalación
node --version
npm --version
```

### Crear proyecto:
```bash
# Crear carpeta
mkdir mi-proyecto
cd mi-proyecto

# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install express cors dotenv
```

### Ejecutar:
```bash
# Ejecutar archivo
node index.js

# Ejecutar con nodemon (reinicia automáticamente)
npx nodemon index.js
```

## Módulos en Node.js:

### 1. **Módulos nativos** (incluidos):
```javascript
const http = require('http');      // Servidor HTTP
const fs = require('fs');          // Sistema de archivos
const path = require('path');      // Manejo de rutas
const crypto = require('crypto');  // Criptografía
```

### 2. **Módulos de NPM** (instalados):
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
```

### 3. **Módulos locales** (tus archivos):
```javascript
// utils.js
module.exports = {
  sumar: (a, b) => a + b,
  restar: (a, b) => a - b
};

// index.js
const utils = require('./utils');
console.log(utils.sumar(2, 3)); // 5
```

## Asincronía en Node.js:

### 1. **Callbacks** (forma antigua):
```javascript
fs.readFile('archivo.txt', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Datos:', data.toString());
});
```

### 2. **Promises** (forma moderna):
```javascript
fs.promises.readFile('archivo.txt')
  .then(data => {
    console.log('Datos:', data.toString());
  })
  .catch(err => {
    console.error('Error:', err);
  });
```

### 3. **Async/Await** (forma más moderna):
```javascript
async function leerArchivo() {
  try {
    const data = await fs.promises.readFile('archivo.txt');
    console.log('Datos:', data.toString());
  } catch (err) {
    console.error('Error:', err);
  }
}
```

## Mejores prácticas:

### ✅ **SÍ hacer**:
- Usar `async/await` en lugar de callbacks
- Manejar errores con `try/catch`
- Usar variables de entorno para configuración
- Escribir código modular y reutilizable
- Usar herramientas como ESLint y Prettier

### ❌ **NO hacer**:
- Usar `require()` y `import` mezclados
- Ignorar el manejo de errores
- Bloquear el event loop con operaciones síncronas
- Instalar dependencias globales innecesarias

## Resumen simple:

- **Node.js** = JavaScript que funciona en servidores
- **Ventajas** = Rápido, JavaScript en todas partes, ecosistema grande
- **Ideal para** = APIs, aplicaciones en tiempo real, microservicios
- **No ideal para** = Aplicaciones CPU intensivas
- **Asíncrono** = No bloquea el servidor
- **NPM** = Gestor de paquetes con miles de librerías

## Analogía:
Node.js es como un "traductor universal" que toma JavaScript (que normalmente solo habla el navegador) y le enseña a hablar con servidores, bases de datos y sistemas operativos. Es como tener un intérprete que puede traducir entre JavaScript y el mundo del servidor.
