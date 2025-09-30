// VERSIÓN MODULAR - Programación Funcional
// Funciones puras para manejar datos en memoria

import { createUser, getUserWithoutPassword } from '../utils/user.utils.js';

// Estado global (simulando base de datos)
let usuarios = [
    createUser({
        id: 1,
        nombre: "Admin",
        email: "admin@email.com",
        password: "123456",
        createdAt: "2024-01-01T00:00:00.000Z"
    })
];

// Obtener usuario por ID sin contraseña
export const getUserById = (id) => {
    const usuario = usuarios.find(user => user.id === parseInt(id));
    return usuario ? getUserWithoutPassword(usuario) : null;
};

// Obtener usuario por email sin contraseña
export const getUserByEmail = (email) => {
    const usuario = usuarios.find(user => user.email === email);
    return usuario ? getUserWithoutPassword(usuario) : null;
};

// Crear nuevo usuario
export const createNewUser = (userData) => {
    const nuevoUsuario = createUser(userData);
    usuarios.push(nuevoUsuario);
    return getUserWithoutPassword(nuevoUsuario);
};

// Verificar si email existe
export const emailExists = (email) => {
    return usuarios.some(user => user.email === email);
};

// Actualizar contraseña de usuario
export const updateUserPassword = (id, newPassword) => {
    const index = usuarios.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
        usuarios[index].password = newPassword;
        return true;
    }
    return false;
};
