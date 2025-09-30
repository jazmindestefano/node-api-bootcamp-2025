import { User } from '../models/user.model.js';

// Simulamos una base de datos en memoria
// ¿Por qué es posible guardar datos en memoria?
// - Los datos persisten mientras el servidor Node.js esté corriendo
// - Es útil para desarrollo, testing y prototipos rápidos
// - No requiere configuración de base de datos externa
// - Los datos se pierden al reiniciar el servidor (volátil)
// - En producción se debe usar una base de datos real (MySQL, PostgreSQL, MongoDB, etc.)
//
// ¿Dónde se guardan exactamente estos datos?
// - En la RAM (memoria principal) de la computadora
// - En el heap de JavaScript (área de memoria para objetos)
// - En el proceso de Node.js que está ejecutando el servidor
// - Los datos viven en la variable 'usuarios' que es un array en JavaScript
// - Cada vez que se reinicia el servidor, Node.js crea un nuevo proceso y se pierde todo
let usuarios = [
    new User({
        id: 1,
        nombre: "Admin",
        email: "admin@email.com",
        password: "123456", // En producción esto estaría encriptado
        createdAt: "2024-01-01T00:00:00.000Z"
    })
];

// Obtener todos los usuarios
export const getAllUsers = () => {
    return usuarios.map(user => user.toSafeObject());
};

// Obtener un usuario por ID
export const getUserById = (id) => {
    const usuario = usuarios.find(user => user.id === parseInt(id));
    return usuario ? usuario.toSafeObject() : null;
};

// Obtener un usuario por ID (con contraseña para autenticación)
export const getUserByIdWithPassword = (id) => {
    return usuarios.find(user => user.id === parseInt(id));
};

// Obtener un usuario por email
export const getUserByEmail = (email) => {
    const usuario = usuarios.find(user => user.email === email);
    return usuario ? usuario.toSafeObject() : null;
};

// Obtener un usuario por email (con contraseña para autenticación)
export const getUserByEmailWithPassword = (email) => {
    return usuarios.find(user => user.email === email);
};

// Crear un nuevo usuario
export const createUser = (userData) => {
    const nuevoUsuario = new User(userData);
    usuarios.push(nuevoUsuario);
    return nuevoUsuario.toSafeObject();
};

// Verificar si un email ya existe
export const emailExists = (email) => {
    return usuarios.some(user => user.email === email);
};

// Obtener el siguiente ID disponible
export const getNextId = () => {
    return Math.max(...usuarios.map(user => user.id)) + 1;
};

// Actualizar un usuario
export const updateUser = (id, userData) => {
    const index = usuarios.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        return null;
    }
    
    // Actualizar solo los campos proporcionados
    const usuarioActualizado = new User({
        ...usuarios[index],
        ...userData,
        id: parseInt(id) // Mantener el ID original
    });
    
    usuarios[index] = usuarioActualizado;
    return usuarioActualizado.toSafeObject();
};

// Eliminar un usuario
export const deleteUser = (id) => {
    const index = usuarios.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        return false;
    }
    
    usuarios.splice(index, 1);
    return true;
};

// Obtener el total de usuarios
export const getUserCount = () => {
    return usuarios.length;
};
