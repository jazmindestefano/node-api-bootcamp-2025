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

// Obtener usuario por ID que devuelve contraseña
export const getUserByIdWithPassword = (id) => {
    return usuarios.find(user => user.id === parseInt(id));
};

// Obtener usuario por email que devuelve contraseña
export const getUserByEmailWithPassword = (email) => {
    return usuarios.find(user => user.email === email);
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
