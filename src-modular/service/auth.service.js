// VERSIÓN MODULAR - Programación Funcional
// Funciones puras para lógica de autenticación

import { 
    createNewUser, 
    getUserByEmailWithPassword, 
    emailExists,
    getUserByIdWithPassword 
} from '../repository/user.repository.js';
import { validateUser } from '../utils/user.utils.js';

// Registrar usuario (función pura)
export const registerUser = async (userData) => {
    const { nombre, email, password } = userData;
    
    // Validar datos
    const errors = validateUser({ nombre, email, password });
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    // Verificar si email existe
    if (emailExists(email)) {
        throw new Error('El email ya está registrado');
    }
    
    // Crear usuario
    return createNewUser({ nombre, email, password });
};

// Hacer login (función pura)
export const loginUser = async (email, password) => {
    const usuario = getUserByEmailWithPassword(email);
    
    if (!usuario) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    if (usuario.password !== password) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    const token = `token_${usuario.id}_${Date.now()}`;
    
    return {
        usuario: {
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            createdAt: usuario.createdAt
        },
        token
    };
};

// Verificar token (función pura)
export const verifyToken = async (token) => {
    if (!token || !token.startsWith('token_')) {
        throw new Error('Token inválido');
    }
    
    const parts = token.split('_');
    if (parts.length !== 3) {
        throw new Error('Token inválido');
    }
    
    const userId = parseInt(parts[1]);
    const usuario = getUserByIdWithPassword(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        createdAt: usuario.createdAt
    };
};

// Obtener perfil de usuario (función pura)
export const getUserProfile = async (userId) => {
    const usuario = getUserByIdWithPassword(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        createdAt: usuario.createdAt
    };
};
