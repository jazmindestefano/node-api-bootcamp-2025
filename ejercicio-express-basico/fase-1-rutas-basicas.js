// ========================================
// FASE 1: RUTAS BÁSICAS
// ========================================
// Objetivo: Crear las rutas básicas de la API sin lógica de negocio

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware básico
app.use(express.json());

// ========================================
// ENUNCIADO FASE 1
// ========================================

/*
🎯 OBJETIVO: Crear las rutas básicas de la API

📝 TAREAS:
1. Crear servidor Express básico
2. Implementar ruta principal GET /
3. Implementar rutas de autenticación (sin lógica)
4. Implementar rutas de usuarios (sin lógica)
5. Manejar parámetros de URL
6. Devolver respuestas JSON apropiadas

✅ CRITERIOS DE ÉXITO:
- El servidor debe iniciar sin errores
- Todas las rutas deben responder con JSON
- Las rutas con parámetros deben extraer los valores correctamente
- Las respuestas deben tener la estructura esperada

🚀 RUTAS A IMPLEMENTAR:
- GET / - Página principal con información de la API
- POST /api/auth/register - Registrar usuario (solo estructura)
- POST /api/auth/login - Login (solo estructura)
- GET /api/auth/user-basic-info/:id - Obtener usuario por ID
- GET /api/auth/all-users-info - Obtener todos los usuarios
- PUT /api/auth/users/:id - Actualizar usuario completamente
- PATCH /api/auth/users/:id - Actualizar usuario parcialmente
- DELETE /api/auth/users/:id - Eliminar usuario

💡 PISTAS:
- Usa app.get(), app.post(), app.put(), app.patch(), app.delete()
- Para parámetros usa :id en la ruta y req.params.id
- Para datos del body usa req.body
- Para headers usa req.headers
- Responde siempre con res.json()
*/

// ========================================
// RUTA PRINCIPAL
// ========================================

app.get('/', (req, res) => {
    res.json({
        message: 'API de Usuarios - Fase 1',
        phase: 'Rutas Básicas',
        endpoints: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            userBasicInfo: 'GET /api/auth/user-basic-info/:id',
            allUsersInfo: 'GET /api/auth/all-users-info',
            updateUserComplete: 'PUT /api/auth/users/:id',
            updateUserPartial: 'PATCH /api/auth/users/:id',
            deleteUser: 'DELETE /api/auth/users/:id'
        }
    });
});

// ========================================
// RUTAS DE AUTENTICACIÓN
// ========================================

// TODO: Implementar POST /api/auth/register
// Debe recibir { nombre, email, password } en el body
// Debe responder con { message: 'Usuario registrado correctamente', usuario: {...} }

app.post('/api/auth/register', (req, res) => {
    // TU CÓDIGO AQUÍ
    // Extraer datos del body: const { nombre, email, password } = req.body;
    // Responder con JSON apropiado
    res.json({
        message: 'Ruta implementada - Falta lógica de negocio',
        datos_recibidos: req.body
    });
});

// TODO: Implementar POST /api/auth/login
// Debe recibir { email, password } en el body
// Debe responder con { message: 'Login exitoso', usuario: {...}, token: '...' }

app.post('/api/auth/login', (req, res) => {
    // TU CÓDIGO AQUÍ
    res.json({
        message: 'Ruta implementada - Falta lógica de negocio',
        datos_recibidos: req.body
    });
});


// ========================================
// RUTAS DE USUARIOS
// ========================================

// TODO: Implementar GET /api/auth/user-basic-info/:id
// Debe extraer el parámetro id de la URL
// Debe responder con { message: 'Información básica del usuario', usuario: {...} }

app.get('/api/auth/user-basic-info/:id', (req, res) => {
    // TU CÓDIGO AQUÍ
    // Extraer parámetro: const { id } = req.params;
    res.json({
        message: 'Ruta implementada - Falta lógica de negocio',
        id_recibido: req.params.id
    });
});

// TODO: Implementar GET /api/auth/all-users-info
// Debe responder con { message: 'Información de todos los usuarios', usuarios: [...] }

app.get('/api/auth/all-users-info', (req, res) => {
    // TU CÓDIGO AQUÍ
    res.json({
        message: 'Ruta implementada - Falta lógica de negocio',
        usuarios: []
    });
});

// TODO: Implementar PUT /api/auth/users/:id
// Debe recibir { nombre, email, password } en el body
// Debe extraer el parámetro id de la URL
// Debe responder con { message: 'Usuario actualizado completamente', usuario: {...} }

app.put('/api/auth/users/:id', (req, res) => {
    // TU CÓDIGO AQUÍ
    res.json({
        message: 'Ruta implementada - Falta lógica de negocio',
        id_recibido: req.params.id,
        datos_recibidos: req.body
    });
});

// TODO: Implementar PATCH /api/auth/users/:id
// Debe recibir datos parciales en el body
// Debe extraer el parámetro id de la URL
// Debe responder con { message: 'Usuario actualizado parcialmente', usuario: {...} }

app.patch('/api/auth/users/:id', (req, res) => {
    // TU CÓDIGO AQUÍ
    res.json({
        message: 'Ruta implementada - Falta lógica de negocio',
        id_recibido: req.params.id,
        datos_recibidos: req.body
    });
});

// TODO: Implementar DELETE /api/auth/users/:id
// Debe extraer el parámetro id de la URL
// Debe responder con { message: 'Usuario eliminado correctamente', usuario: {...} }

app.delete('/api/auth/users/:id', (req, res) => {
    // TU CÓDIGO AQUÍ
    res.json({
        message: 'Ruta implementada - Falta lógica de negocio',
        id_recibido: req.params.id
    });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
    console.log('🚀 Fase 1: Servidor de Rutas Básicas iniciado!');
    console.log(`📍 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('');
    console.log('📝 Tareas pendientes:');
    console.log('   1. Implementar todas las rutas con la estructura correcta');
    console.log('   2. Extraer parámetros y datos del body correctamente');
    console.log('   3. Responder con JSON apropiado');
    console.log('   4. Probar todas las rutas con Postman o curl');
    console.log('');
    console.log('✅ Cuando termines, pasa a la Fase 2!');
});

// ========================================
// CONCEPTOS IMPORTANTES FASE 1
// ========================================

/*
RUTAS HTTP:
- GET: Obtener datos
- POST: Crear datos
- PUT: Actualizar completamente
- PATCH: Actualizar parcialmente
- DELETE: Eliminar datos

PARÁMETROS DE URL:
- :id en la ruta captura el valor
- req.params.id contiene el valor
- Ejemplo: /users/:id → req.params.id

DATOS DEL BODY:
- req.body contiene los datos enviados
- Necesita app.use(express.json()) para parsear JSON
- Solo disponible en POST, PUT, PATCH

HEADERS:
- req.headers contiene todos los headers
- req.headers.authorization para el token
- req.headers['content-type'] para el tipo de contenido

RESPUESTAS:
- res.json() envía respuesta JSON
- res.status() establece código de estado
- Siempre responder con JSON estructurado
*/
