# Para qué sirve CORS

CORS (Cross-Origin Resource Sharing) es como un "guardián de seguridad" que decide qué sitios web pueden conectarse a tu API.

## ¿Qué es?

### CORS:
- **Controla el acceso** entre diferentes dominios
- **Previene ataques** maliciosos
- **Permite o bloquea** peticiones desde otros sitios
- **Es una política de seguridad** del navegador

### Ejemplo del problema:
```
Tu API: https://mi-api.com
Tu frontend: https://mi-sitio.com

❌ SIN CORS: El navegador bloquea la conexión
✅ CON CORS: El navegador permite la conexión
```

## ¿Por qué existe CORS?

### El problema de seguridad:
- **Sin CORS**: Cualquier sitio web podría acceder a tu API
- **Con CORS**: Solo los sitios que tú autorices pueden acceder
- **Protege** contra ataques de sitios maliciosos

### Ejemplo de ataque sin CORS:
```javascript
// Sitio malicioso: https://sitio-malo.com
fetch('https://tu-api.com/usuarios')
  .then(response => response.json())
  .then(data => {
    // Roba todos los datos de usuarios
    enviarDatosRobados(data);
  });
```

## ¿Cómo funciona?

### 1. **Petición del navegador**:
```
Frontend: "Hola API, dame los usuarios"
Navegador: "Espera, ¿estás autorizado para hacer esto?"
```

### 2. **Respuesta de la API**:
```
API: "Sí, este sitio está autorizado"
Headers: Access-Control-Allow-Origin: https://mi-sitio.com
```

### 3. **Navegador permite la conexión**:
```
Navegador: "Perfecto, aquí tienes los datos"
Frontend: "¡Gracias! Ahora muestro los usuarios"
```

## Tipos de CORS:

### 1. **CORS Simple** (GET, POST básico):
```javascript
// Tu API responde con:
Access-Control-Allow-Origin: https://mi-sitio.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
```

### 2. **CORS Preflight** (métodos complejos):
```javascript
// El navegador primero pregunta:
OPTIONS /api/usuarios
Origin: https://mi-sitio.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Authorization

// Tu API responde:
Access-Control-Allow-Origin: https://mi-sitio.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Configuración en tu proyecto:

### 1. **Instalar CORS**:
```bash
npm install cors
```

### 2. **Configurar en tu servidor**:
```javascript
import cors from "cors";

const app = express();

// Permitir a TODOS los sitios (desarrollo)
app.use(cors());

// O configurar específicamente
app.use(cors({
  origin: 'https://mi-sitio.com',  // Solo este sitio
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Diferentes configuraciones:

### 1. **Desarrollo** (permitir todo):
```javascript
app.use(cors());  // ← Cualquier sitio puede conectarse
```

### 2. **Producción** (solo sitios específicos):
```javascript
app.use(cors({
  origin: ['https://mi-sitio.com', 'https://mi-app.com'],
  credentials: true
}));
```

### 3. **Múltiples orígenes**:
```javascript
const allowedOrigins = [
  'https://mi-sitio.com',
  'https://mi-app.com',
  'http://localhost:3000'  // Para desarrollo
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));
```

## Errores comunes de CORS:

### 1. **Error típico**:
```
Access to fetch at 'https://mi-api.com/usuarios' 
from origin 'https://mi-sitio.com' has been blocked by CORS policy
```

### 2. **Causas**:
- No tienes CORS configurado
- El origen no está autorizado
- Método HTTP no permitido
- Headers no autorizados

### 3. **Soluciones**:
```javascript
// ✅ Configurar CORS
app.use(cors());

// ✅ Permitir el origen específico
app.use(cors({
  origin: 'https://mi-sitio.com'
}));

// ✅ Permitir métodos específicos
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

## Headers importantes:

### 1. **Access-Control-Allow-Origin**:
```javascript
// Permitir un sitio específico
Access-Control-Allow-Origin: https://mi-sitio.com

// Permitir cualquier sitio (¡cuidado en producción!)
Access-Control-Allow-Origin: *
```

### 2. **Access-Control-Allow-Methods**:
```javascript
// Métodos permitidos
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

### 3. **Access-Control-Allow-Headers**:
```javascript
// Headers permitidos
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Ejemplo completo:

### Tu servidor (index.js):
```javascript
import express from "express";
import cors from "cors";

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'https://mi-sitio.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/api/usuarios', (req, res) => {
  res.json({ usuarios: ['Juan', 'María'] });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
```

### Tu frontend:
```javascript
// Esto funcionará si el origen está autorizado
fetch('http://localhost:3000/api/usuarios')
  .then(response => response.json())
  .then(data => {
    console.log(data.usuarios);  // ['Juan', 'María']
  });
```

## Mejores prácticas:

### ✅ SÍ hacer:
- Configurar CORS específicamente para producción
- Usar `cors()` sin configuración solo en desarrollo
- Documentar qué orígenes están permitidos
- Probar CORS en diferentes entornos

### ❌ NO hacer:
- Usar `*` en producción (permite cualquier sitio)
- Olvidar configurar CORS
- Ignorar errores de CORS
- Permitir métodos innecesarios

## Comandos útiles:

```bash
# Instalar CORS
npm install cors

# Ver errores de CORS en el navegador
# Abre las herramientas de desarrollador (F12)
# Ve a la pestaña "Console" o "Network"
```
