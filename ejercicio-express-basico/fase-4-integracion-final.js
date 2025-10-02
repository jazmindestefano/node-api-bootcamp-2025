// ========================================
// FASE 4: INTEGRACIÓN FINAL
// ========================================
// Objetivo: Crear la estructura modular final con archivos separados

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware básico
app.use(express.json());

// ========================================
// ENUNCIADO FASE 4
// ========================================

/*
🎯 OBJETIVO: Crear la estructura modular final con archivos separados

📝 TAREAS:
1. Crear archivos separados para cada capa
2. Implementar funciones de utilidad
3. Agregar middleware personalizado
4. Crear estructura de carpetas profesional
5. Implementar manejo de errores centralizado

✅ CRITERIOS DE ÉXITO:
- Código organizado en archivos separados
- Estructura de carpetas profesional
- Middleware personalizado funcionando
- Manejo de errores centralizado
- Código limpio y mantenible

🚀 ESTRUCTURA A CREAR:
- models/user.model.js - Modelos y validaciones
- repository/user.repository.js - Acceso a datos
- service/auth.service.js - Lógica de negocio
- routes/auth.routes.js - Rutas HTTP
- utils/validation.utils.js - Utilidades
- index.js - Aplicación principal

💡 PISTAS:
- Usa module.exports y require() para importar/exportar
- Crea funciones puras y reutilizables
- Separa responsabilidades claramente
- Usa middleware para funcionalidades comunes
*/

// ========================================
// ESTRUCTURA DE ARCHIVOS A CREAR
// ========================================

/*
📁 Estructura de carpetas:
ejercicio-express-basico/
├── models/
│   └── user.model.js
├── repository/
│   └── user.repository.js
├── service/
│   └── auth.service.js
├── routes/
│   └── auth.routes.js
├── utils/
│   └── validation.utils.js
├── index.js
└── package.json
*/

// ========================================
// INSTRUCCIONES DETALLADAS
// ========================================

/*
📋 PASOS PARA COMPLETAR LA FASE 4:

1. CREAR CARPETAS:
   mkdir models repository service routes utils

2. CREAR models/user.model.js:
   - Función createUser(userData)
   - Función getUserWithoutPassword(user)
   - Función validateUser(userData)
   - Constantes de validación

3. CREAR repository/user.repository.js:
   - Base de datos en memoria
   - Funciones CRUD completas
   - Funciones de búsqueda
   - Funciones de utilidad

4. CREAR service/auth.service.js:
   - Todas las funciones de servicio
   - Validaciones de negocio
   - Manejo de errores
   - Lógica de autenticación

5. CREAR utils/validation.utils.js:
   - Función validateInput(req, requiredFields)
   - Función handleError(error, res)
   - Utilidades de validación

6. CREAR routes/auth.routes.js:
   - Todas las rutas HTTP
   - Manejo de errores
   - Validaciones de entrada
   - Respuestas estructuradas

7. CREAR index.js:
   - Configuración de Express
   - Middleware personalizado
   - Configuración de rutas
   - Inicio del servidor

8. ACTUALIZAR package.json:
   - Scripts de desarrollo
   - Dependencias necesarias
   - Configuración del proyecto
*/

// ========================================
// EJEMPLO DE IMPLEMENTACIÓN
// ========================================

// Este archivo es solo un ejemplo de cómo debería verse la integración final
// Los estudiantes deben crear los archivos separados según las instrucciones

// Base de datos en memoria (esto iría en repository/user.repository.js)
let usuarios = [
    {
        id: 1,
        nombre: 'Admin',
        email: 'admin@email.com',
        password: '123456',
        createdAt: '2024-01-01T00:00:00.000Z'
    }
];

let proximoId = 2;

// ========================================
// FUNCIONES DE UTILIDAD (utils/validation.utils.js)
// ========================================

function validateInput(req, requiredFields) {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    return missingFields;
}

function handleError(error, res) {
    console.error('Error:', error.message);
    res.status(400).json({
        message: error.message
    });
}

// ========================================
// FUNCIONES DE MODELO (models/user.model.js)
// ========================================

function createUser(userData) {
    return {
        id: proximoId++,
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString()
    };
}

function getUserWithoutPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

function validateUser(userData) {
    const errors = [];
    
    if (!userData.nombre || userData.nombre.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        errors.push('El email debe tener un formato válido');
    }
    
    if (!userData.password || userData.password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    return errors;
}

// ========================================
// FUNCIONES DE REPOSITORIO (repository/user.repository.js)
// ========================================

function createUserInDB(userData) {
    const nuevoUsuario = createUser(userData);
    usuarios.push(nuevoUsuario);
    return getUserWithoutPassword(nuevoUsuario);
}

function getUserByEmail(email) {
    const usuario = usuarios.find(u => u.email === email);
    return usuario ? getUserWithoutPassword(usuario) : null;
}

function getUserById(id) {
    const usuario = usuarios.find(u => u.id === parseInt(id));
    return usuario ? getUserWithoutPassword(usuario) : null;
}

function getAllUsers() {
    return usuarios.map(u => getUserWithoutPassword(u));
}

function updateUser(id, userData) {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return null;
    }
    
    if (userData.nombre) usuarios[index].nombre = userData.nombre;
    if (userData.email) usuarios[index].email = userData.email;
    if (userData.password) usuarios[index].password = userData.password;
    
    return getUserWithoutPassword(usuarios[index]);
}

function deleteUser(id) {
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return null;
    }
    
    const usuarioEliminado = usuarios.splice(index, 1)[0];
    return getUserWithoutPassword(usuarioEliminado);
}

function emailExists(email) {
    return usuarios.some(u => u.email === email);
}

// ========================================
// FUNCIONES DE SERVICIO (service/auth.service.js)
// ========================================

function registerUser(userData) {
    const { nombre, email, password } = userData;
    
    const errors = validateUser({ nombre, email, password });
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    if (emailExists(email)) {
        throw new Error('El email ya está registrado');
    }
    
    return createUserInDB({ nombre, email, password });
}

function loginUser(email, password) {
    if (!email || !password) {
        throw new Error('Email y password son obligatorios');
    }
    
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    if (usuario.password !== password) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    const token = `token_${usuario.id}_${Date.now()}`;
    
    return {
        usuario: getUserWithoutPassword(usuario),
        token
    };
}


function getUserBasicInfoById(id) {
    const usuario = getUserById(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return usuario;
}

function getAllUsersInfo() {
    return getAllUsers();
}

function updateUserComplete(id, userData) {
    const { nombre, email, password } = userData;
    
    const errors = validateUser({ nombre, email, password });
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    const usuarioExistente = getUserById(id);
    if (!usuarioExistente) {
        throw new Error('Usuario no encontrado');
    }
    
    const emailEnUso = usuarios.some(u => u.email === email && u.id !== parseInt(id));
    if (emailEnUso) {
        throw new Error('El email ya está registrado por otro usuario');
    }
    
    const usuarioActualizado = updateUser(id, { nombre, email, password });
    if (!usuarioActualizado) {
        throw new Error('Error al actualizar usuario');
    }
    
    return usuarioActualizado;
}

function updateUserPartial(id, userData) {
    const usuarioExistente = getUserById(id);
    if (!usuarioExistente) {
        throw new Error('Usuario no encontrado');
    }
    
    if (userData.email) {
        const emailEnUso = usuarios.some(u => u.email === userData.email && u.id !== parseInt(id));
        if (emailEnUso) {
            throw new Error('El email ya está registrado por otro usuario');
        }
    }
    
    if (userData.password && userData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    
    const usuarioActualizado = updateUser(id, userData);
    if (!usuarioActualizado) {
        throw new Error('Error al actualizar usuario');
    }
    
    return usuarioActualizado;
}

function deleteUserById(id) {
    const usuarioEliminado = deleteUser(id);
    if (!usuarioEliminado) {
        throw new Error('Usuario no encontrado');
    }
    return usuarioEliminado;
}

// ========================================
// RUTAS (routes/auth.routes.js)
// ========================================

const router = express.Router();

router.post('/register', (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        const missingFields = validateInput(req, ['nombre', 'email', 'password']);
        if (missingFields.length > 0) {
            return handleError(new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), res);
        }
        
        const usuario = registerUser({ nombre, email, password });
        
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            usuario
        });
    } catch (error) {
        handleError(error, res);
    }
});

router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        
        const missingFields = validateInput(req, ['email', 'password']);
        if (missingFields.length > 0) {
            return handleError(new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), res);
        }
        
        const result = loginUser(email, password);
        
        res.json({
            message: 'Login exitoso',
            usuario: result.usuario,
            token: result.token
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
});


router.get('/user-basic-info/:id', (req, res) => {
    try {
        const { id } = req.params;
        const usuario = getUserBasicInfoById(id);
        
        res.json({
            message: 'Información básica del usuario',
            usuario
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});

router.get('/all-users-info', (req, res) => {
    try {
        const usuarios = getAllUsersInfo();
        
        res.json({
            message: 'Información de todos los usuarios',
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.put('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        
        const missingFields = validateInput(req, ['nombre', 'email', 'password']);
        if (missingFields.length > 0) {
            return handleError(new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), res);
        }
        
        const usuario = updateUserComplete(id, { nombre, email, password });
        
        res.json({
            message: 'Usuario actualizado completamente',
            usuario
        });
    } catch (error) {
        handleError(error, res);
    }
});

router.patch('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        
        if (Object.keys(userData).length === 0) {
            return handleError(new Error('No se proporcionaron datos para actualizar'), res);
        }
        
        const usuario = updateUserPartial(id, userData);
        
        res.json({
            message: 'Usuario actualizado parcialmente',
            usuario
        });
    } catch (error) {
        handleError(error, res);
    }
});

router.delete('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const usuario = deleteUserById(id);
        
        res.json({
            message: 'Usuario eliminado correctamente',
            usuario
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});

// ========================================
// APLICACIÓN PRINCIPAL (index.js)
// ========================================

// Middleware personalizado
app.use((req, res, next) => {
    console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'API de Usuarios - Fase 4',
        phase: 'Integración Final',
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

// Usar rutas de autenticación
app.use('/api/auth', router);

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
    console.log('🚀 Fase 4: Integración Final iniciada!');
    console.log(`📍 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('');
    console.log('📝 Tareas finales:');
    console.log('   1. Crear estructura de carpetas');
    console.log('   2. Separar código en archivos');
    console.log('   3. Implementar imports/exports');
    console.log('   4. Probar funcionalidad completa');
    console.log('');
    console.log('🎉 ¡Felicitaciones! Has completado el ejercicio!');
    console.log('💡 Ahora tienes una API profesional y bien estructurada');
});

// ========================================
// CONCEPTOS FINALES FASE 4
// ========================================

/*
ARQUITECTURA MODULAR:
- Separación clara de responsabilidades
- Código organizado en archivos lógicos
- Fácil mantenimiento y escalabilidad

ESTRUCTURA PROFESIONAL:
- models/: Modelos de datos y validaciones
- repository/: Acceso a datos
- service/: Lógica de negocio
- routes/: Rutas HTTP
- utils/: Utilidades y helpers

BENEFICIOS:
- Código reutilizable
- Fácil testing
- Mantenimiento simple
- Escalabilidad
- Colaboración en equipo

PRÓXIMOS PASOS:
- Base de datos real (MongoDB, PostgreSQL)
- Autenticación JWT
- Middleware de seguridad
- Testing automatizado
- Documentación API
- Deployment
*/
