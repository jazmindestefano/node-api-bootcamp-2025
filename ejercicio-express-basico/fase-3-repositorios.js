// ========================================
// FASE 3: REPOSITORIOS
// ========================================
// Objetivo: Separar el acceso a datos en funciones de repositorio

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware básico
app.use(express.json());

// ========================================
// ENUNCIADO FASE 3
// ========================================

/*
🎯 OBJETIVO: Crear funciones de repositorio para manejar el acceso a datos

📝 TAREAS:
1. Crear funciones de repositorio para cada operación de datos
2. Mover la lógica de base de datos a los repositorios
3. Simplificar los servicios para que usen repositorios
4. Implementar funciones de utilidad para datos
5. Separar completamente la lógica de datos de la lógica de negocio

✅ CRITERIOS DE ÉXITO:
- Los servicios no deben acceder directamente a la base de datos
- Los repositorios deben manejar todas las operaciones de datos
- Las funciones de utilidad deben estar separadas
- El código debe estar bien organizado y modular

🚀 REPOSITORIOS A IMPLEMENTAR:
- createUser(userData) - Crear usuario
- getUserByEmail(email) - Buscar usuario por email
- getUserById(id) - Buscar usuario por ID
- getAllUsers() - Obtener todos los usuarios
- updateUser(id, userData) - Actualizar usuario
- deleteUser(id) - Eliminar usuario
- emailExists(email) - Verificar si email existe

💡 PISTAS:
- Los repositorios solo manejan datos, no validaciones de negocio
- Los servicios usan repositorios para acceder a datos
- Crea funciones de utilidad para operaciones comunes
- Mantén la base de datos en una variable separada
*/

// ========================================
// BASE DE DATOS Y UTILIDADES
// ========================================

// Base de datos en memoria
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

// TODO: Implementar función para obtener usuario sin password
function getUserWithoutPassword(user) {
    // TU CÓDIGO AQUÍ
    // Devolver usuario sin el campo password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// TODO: Implementar función para crear usuario con ID único
function createUser(userData) {
    // TU CÓDIGO AQUÍ
    // Crear objeto usuario con id único y timestamp
    return {
        id: proximoId++,
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString()
    };
}

// ========================================
// FUNCIONES DE REPOSITORIO
// ========================================

// TODO: Implementar función para crear usuario en la base de datos
function createUserInDB(userData) {
    // TU CÓDIGO AQUÍ
    // 1. Crear usuario con createUser()
    // 2. Agregar a la base de datos
    // 3. Devolver usuario sin password
    
    const nuevoUsuario = createUser(userData);
    usuarios.push(nuevoUsuario);
    return getUserWithoutPassword(nuevoUsuario);
}

// TODO: Implementar función para buscar usuario por email
function getUserByEmail(email) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar usuario por email
    // 2. Devolver usuario sin password o null
    
    const usuario = usuarios.find(u => u.email === email);
    return usuario ? getUserWithoutPassword(usuario) : null;
}

// TODO: Implementar función para buscar usuario por ID
function getUserById(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar usuario por ID
    // 2. Devolver usuario sin password o null
    
    const usuario = usuarios.find(u => u.id === parseInt(id));
    return usuario ? getUserWithoutPassword(usuario) : null;
}

// TODO: Implementar función para obtener todos los usuarios
function getAllUsers() {
    // TU CÓDIGO AQUÍ
    // 1. Devolver todos los usuarios sin password
    
    return usuarios.map(u => getUserWithoutPassword(u));
}

// TODO: Implementar función para actualizar usuario
function updateUser(id, userData) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar usuario por ID
    // 2. Actualizar campos del usuario
    // 3. Devolver usuario actualizado sin password
    
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return null;
    }
    
    // Actualizar campos
    if (userData.nombre) usuarios[index].nombre = userData.nombre;
    if (userData.email) usuarios[index].email = userData.email;
    if (userData.password) usuarios[index].password = userData.password;
    
    return getUserWithoutPassword(usuarios[index]);
}

// TODO: Implementar función para eliminar usuario
function deleteUser(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar usuario por ID
    // 2. Eliminar usuario de la base de datos
    // 3. Devolver usuario eliminado sin password
    
    const index = usuarios.findIndex(u => u.id === parseInt(id));
    if (index === -1) {
        return null;
    }
    
    const usuarioEliminado = usuarios.splice(index, 1)[0];
    return getUserWithoutPassword(usuarioEliminado);
}

// TODO: Implementar función para verificar si email existe
function emailExists(email) {
    // TU CÓDIGO AQUÍ
    // Verificar si existe un usuario con ese email
    
    return usuarios.some(u => u.email === email);
}

// ========================================
// FUNCIONES DE SERVICIO (USANDO REPOSITORIOS)
// ========================================

// TODO: Refactorizar servicios para usar repositorios
// Los servicios ahora solo manejan lógica de negocio y usan repositorios para datos

function registerUser(userData) {
    const { nombre, email, password } = userData;
    
    // Validaciones de negocio
    if (!nombre || !email || !password) {
        throw new Error('Faltan datos: nombre, email y password son obligatorios');
    }
    
    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    
    // Usar repositorio para verificar email
    if (emailExists(email)) {
        throw new Error('El email ya está registrado');
    }
    
    // Usar repositorio para crear usuario
    return createUserInDB({ nombre, email, password });
}

function loginUser(email, password) {
    if (!email || !password) {
        throw new Error('Email y password son obligatorios');
    }
    
    // Usar repositorio para buscar usuario
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
    // Usar repositorio para buscar usuario
    const usuario = getUserById(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return usuario;
}

function getAllUsersInfo() {
    // Usar repositorio para obtener todos los usuarios
    return getAllUsers();
}

function updateUserComplete(id, userData) {
    const { nombre, email, password } = userData;
    
    if (!nombre || !email || !password) {
        throw new Error('Faltan datos: nombre, email y password son obligatorios');
    }
    
    // Usar repositorio para verificar que usuario existe
    const usuarioExistente = getUserById(id);
    if (!usuarioExistente) {
        throw new Error('Usuario no encontrado');
    }
    
    // Usar repositorio para verificar email
    const emailEnUso = usuarios.some(u => u.email === email && u.id !== parseInt(id));
    if (emailEnUso) {
        throw new Error('El email ya está registrado por otro usuario');
    }
    
    // Usar repositorio para actualizar usuario
    const usuarioActualizado = updateUser(id, { nombre, email, password });
    if (!usuarioActualizado) {
        throw new Error('Error al actualizar usuario');
    }
    
    return usuarioActualizado;
}

function updateUserPartial(id, userData) {
    // Usar repositorio para verificar que usuario existe
    const usuarioExistente = getUserById(id);
    if (!usuarioExistente) {
        throw new Error('Usuario no encontrado');
    }
    
    // Validar email si se está actualizando
    if (userData.email) {
        const emailEnUso = usuarios.some(u => u.email === userData.email && u.id !== parseInt(id));
        if (emailEnUso) {
            throw new Error('El email ya está registrado por otro usuario');
        }
    }
    
    // Validar password si se está actualizando
    if (userData.password && userData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    
    // Usar repositorio para actualizar usuario
    const usuarioActualizado = updateUser(id, userData);
    if (!usuarioActualizado) {
        throw new Error('Error al actualizar usuario');
    }
    
    return usuarioActualizado;
}

function deleteUserById(id) {
    // Usar repositorio para eliminar usuario
    const usuarioEliminado = deleteUser(id);
    if (!usuarioEliminado) {
        throw new Error('Usuario no encontrado');
    }
    
    return usuarioEliminado;
}

// ========================================
// RUTAS (SIN CAMBIOS)
// ========================================

app.get('/', (req, res) => {
    res.json({
        message: 'API de Usuarios - Fase 3',
        phase: 'Repositorios',
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

app.post('/api/auth/register', (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const usuario = registerUser({ nombre, email, password });
        
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
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


app.get('/api/auth/user-basic-info/:id', (req, res) => {
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

app.get('/api/auth/all-users-info', (req, res) => {
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

app.put('/api/auth/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        const usuario = updateUserComplete(id, { nombre, email, password });
        
        res.json({
            message: 'Usuario actualizado completamente',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

app.patch('/api/auth/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        const usuario = updateUserPartial(id, userData);
        
        res.json({
            message: 'Usuario actualizado parcialmente',
            usuario
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

app.delete('/api/auth/users/:id', (req, res) => {
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
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
    console.log('🚀 Fase 3: Repositorios iniciado!');
    console.log(`📍 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('');
    console.log('📝 Tareas pendientes:');
    console.log('   1. Implementar todas las funciones de repositorio');
    console.log('   2. Refactorizar servicios para usar repositorios');
    console.log('   3. Separar completamente la lógica de datos');
    console.log('   4. Probar todas las funcionalidades');
    console.log('');
    console.log('✅ Cuando termines, pasa a la Fase 4!');
});

// ========================================
// CONCEPTOS IMPORTANTES FASE 3
// ========================================

/*
ARQUITECTURA EN CAPAS:
- Rutas: Manejan HTTP (req/res)
- Servicios: Lógica de negocio y validaciones
- Repositorios: Acceso a datos
- Utilidades: Funciones auxiliares

SEPARACIÓN DE RESPONSABILIDADES:
- Repositorios: Solo manejan datos
- Servicios: Solo manejan lógica de negocio
- Cada capa tiene una responsabilidad específica

FUNCIONES DE UTILIDAD:
- getUserWithoutPassword(): Remueve password de objetos
- createUser(): Crea usuarios con ID único
- Funciones reutilizables y puras

ACCESO A DATOS:
- Los servicios no acceden directamente a la base de datos
- Los repositorios encapsulan todas las operaciones de datos
- Fácil cambiar de base de datos en memoria a base de datos real

MODULARIDAD:
- Código bien organizado y fácil de mantener
- Cada función tiene una responsabilidad clara
- Fácil de testear y debuggear
*/
