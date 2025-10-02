// ========================================
// FASE 2: SERVICIOS
// ========================================
// Objetivo: Extraer la lógica de negocio a funciones de servicio

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware básico
app.use(express.json());

// ========================================
// ENUNCIADO FASE 2
// ========================================

/*
🎯 OBJETIVO: Crear funciones de servicio para manejar la lógica de negocio

📝 TAREAS:
1. Crear funciones de servicio para cada operación
2. Implementar validaciones básicas
3. Simular base de datos en memoria
4. Manejar errores en los servicios
5. Conectar servicios con las rutas

✅ CRITERIOS DE ÉXITO:
- Cada ruta debe usar una función de servicio
- Las validaciones deben funcionar correctamente
- Los errores deben manejarse apropiadamente
- La lógica de negocio debe estar separada de las rutas

🚀 SERVICIOS A IMPLEMENTAR:
- registerUser(userData) - Registrar usuario
- loginUser(email, password) - Hacer login
- getUserBasicInfoById(id) - Obtener usuario por ID
- getAllUsersInfo() - Obtener todos los usuarios
- updateUserComplete(id, userData) - Actualizar usuario completamente
- updateUserPartial(id, userData) - Actualizar usuario parcialmente
- deleteUserById(id) - Eliminar usuario

💡 PISTAS:
- Crea funciones que reciban parámetros y devuelvan resultados
- Usa throw new Error() para manejar errores
- Valida los datos antes de procesarlos
- Simula una base de datos con un array en memoria
*/

// ========================================
// SIMULACIÓN DE BASE DE DATOS
// ========================================

// Base de datos en memoria (simulando una base de datos real)
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
// FUNCIONES DE SERVICIO
// ========================================

// TODO: Implementar función para registrar usuario
function registerUser(userData) {
    // TU CÓDIGO AQUÍ
    // 1. Validar que userData tenga nombre, email y password
    // 2. Verificar que el email no esté registrado
    // 3. Crear nuevo usuario con id único
    // 4. Agregar a la base de datos
    // 5. Devolver usuario sin password
    
    const { nombre, email, password } = userData;
    
    // Validaciones
    if (!nombre || !email || !password) {
        throw new Error('Faltan datos: nombre, email y password son obligatorios');
    }
    
    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    
    // Verificar si email ya existe
    const emailExiste = usuarios.some(u => u.email === email);
    if (emailExiste) {
        throw new Error('El email ya está registrado');
    }
    
    // Crear nuevo usuario
    const nuevoUsuario = {
        id: proximoId++,
        nombre,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    
    usuarios.push(nuevoUsuario);
    
    // Devolver usuario sin password
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
}

// TODO: Implementar función para hacer login
function loginUser(email, password) {
    // TU CÓDIGO AQUÍ
    // 1. Validar que email y password estén presentes
    // 2. Buscar usuario por email
    // 3. Verificar password (simplificado: solo comparar)
    // 4. Generar token simple
    // 5. Devolver usuario y token
    
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
    
    const { password: _, ...usuarioSinPassword } = usuario;
    return {
        usuario: usuarioSinPassword,
        token
    };
}


// TODO: Implementar función para obtener usuario por ID
function getUserBasicInfoById(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar usuario por ID
    // 2. Devolver usuario sin password
    // 3. Lanzar error si no existe
    
    const usuario = usuarios.find(u => u.id === parseInt(id));
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    const { password: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
}

// TODO: Implementar función para obtener todos los usuarios
function getAllUsersInfo() {
    // TU CÓDIGO AQUÍ
    // 1. Devolver todos los usuarios sin password
    
    return usuarios.map(u => {
        const { password: _, ...usuarioSinPassword } = u;
        return usuarioSinPassword;
    });
}

// TODO: Implementar función para actualizar usuario completamente
function updateUserComplete(id, userData) {
    // TU CÓDIGO AQUÍ
    // 1. Validar datos completos
    // 2. Buscar usuario por ID
    // 3. Verificar que email no esté en uso por otro usuario
    // 4. Actualizar usuario
    // 5. Devolver usuario actualizado sin password
    
    const { nombre, email, password } = userData;
    
    if (!nombre || !email || !password) {
        throw new Error('Faltan datos: nombre, email y password son obligatorios');
    }
    
    const usuario = usuarios.find(u => u.id === parseInt(id));
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    // Verificar que email no esté en uso por otro usuario
    const emailEnUso = usuarios.some(u => u.email === email && u.id !== parseInt(id));
    if (emailEnUso) {
        throw new Error('El email ya está registrado por otro usuario');
    }
    
    // Actualizar usuario
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.password = password;
    
    const { password: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
}

// TODO: Implementar función para actualizar usuario parcialmente
function updateUserPartial(id, userData) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar usuario por ID
    // 2. Validar solo los campos enviados
    // 3. Verificar que email no esté en uso por otro usuario
    // 4. Actualizar solo los campos enviados
    // 5. Devolver usuario actualizado sin password
    
    const usuario = usuarios.find(u => u.id === parseInt(id));
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    if (userData.nombre) {
        usuario.nombre = userData.nombre;
    }
    
    if (userData.email) {
        // Verificar que email no esté en uso por otro usuario
        const emailEnUso = usuarios.some(u => u.email === userData.email && u.id !== parseInt(id));
        if (emailEnUso) {
            throw new Error('El email ya está registrado por otro usuario');
        }
        usuario.email = userData.email;
    }
    
    if (userData.password) {
        if (userData.password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        usuario.password = userData.password;
    }
    
    const { password: _, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
}

// TODO: Implementar función para eliminar usuario
function deleteUserById(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar usuario por ID
    // 2. Eliminar usuario de la base de datos
    // 3. Devolver usuario eliminado sin password
    
    const indice = usuarios.findIndex(u => u.id === parseInt(id));
    if (indice === -1) {
        throw new Error('Usuario no encontrado');
    }
    
    const usuarioEliminado = usuarios.splice(indice, 1)[0];
    const { password: _, ...usuarioSinPassword } = usuarioEliminado;
    return usuarioSinPassword;
}

// ========================================
// RUTAS (CONECTADAS CON SERVICIOS)
// ========================================

app.get('/', (req, res) => {
    res.json({
        message: 'API de Usuarios - Fase 2',
        phase: 'Servicios',
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

// TODO: Conectar todas las rutas con sus respectivos servicios
// Usa try/catch para manejar errores de los servicios

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
    console.log('🚀 Fase 2: Servicios iniciado!');
    console.log(`📍 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('');
    console.log('📝 Tareas pendientes:');
    console.log('   1. Implementar todas las funciones de servicio');
    console.log('   2. Conectar servicios con las rutas');
    console.log('   3. Manejar errores apropiadamente');
    console.log('   4. Probar todas las funcionalidades');
    console.log('');
    console.log('✅ Cuando termines, pasa a la Fase 3!');
});

// ========================================
// CONCEPTOS IMPORTANTES FASE 2
// ========================================

/*
SEPARACIÓN DE RESPONSABILIDADES:
- Rutas: Solo manejan HTTP (req/res)
- Servicios: Contienen la lógica de negocio
- Cada función tiene una responsabilidad específica

MANEJO DE ERRORES:
- Usa throw new Error() en los servicios
- Captura errores con try/catch en las rutas
- Devuelve códigos de estado HTTP apropiados

VALIDACIONES:
- Valida datos de entrada en los servicios
- Verifica reglas de negocio
- Lanza errores descriptivos

BASE DE DATOS EN MEMORIA:
- Array para simular base de datos
- ID único para cada registro
- Operaciones CRUD básicas

FUNCIONES PURAS:
- Reciben parámetros
- Devuelven resultados
- No tienen efectos secundarios (excepto modificar el array)
*/
