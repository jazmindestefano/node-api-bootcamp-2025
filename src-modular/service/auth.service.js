// VERSIÓN MODULAR - Programación Funcional
// Funciones puras para lógica de autenticación

import { 
    createNewUser, 
    getUserByEmail,
    emailExists,
    getUserById,
    updateUserPassword
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
    // Para login necesitamos verificar la contraseña, pero no devolverla
    // Usamos emailExists para verificar que el usuario existe
    if (!emailExists(email)) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    // En un caso real, aquí harías la verificación de contraseña
    // Por simplicidad, asumimos que la contraseña es correcta
    const usuario = getUserByEmail(email);
    
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
    const usuario = getUserById(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return usuario;
};

// Obtener usuario por email (función pura)
export const getUserByEmail = async (email) => {
    const usuario = getUserByEmail(email);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return usuario;
};

// Cambiar contraseña (función pura)
export const changePassword = async (userId, oldPassword, newPassword) => {
    const usuario = getUserById(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    // En un caso real, aquí verificarías la contraseña actual
    // Por simplicidad, asumimos que es correcta
    
    // Validar nueva contraseña
    const errors = validateUser({ ...usuario, password: newPassword });
    
    if (errors.length > 0) {
        throw new Error(`Nueva contraseña inválida: ${errors.join(', ')}`);
    }
    
    // Actualizar contraseña usando el repository
    updateUserPassword(userId, newPassword);
    
    return { message: 'Contraseña cambiada exitosamente' };
};
