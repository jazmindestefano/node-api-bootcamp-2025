import { 
    createNewUser, 
    getUserByEmail,
    emailExists,
    getUserById,
    updateUserPassword,
    getAllUsers
} from '../repository/user.repository.js';
import { validateUser } from '../models/user.model.js';

export const registerUser = async (userData) => {
    const { nombre, email, password } = userData;
    
    const errors = validateUser({ nombre, email, password });
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    if (emailExists(email)) {
        throw new Error('El email ya está registrado');
    }
    
    return createNewUser({ nombre, email, password });
};

export const loginUser = async (email, password) => {
    if (!emailExists(email)) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    const usuario = getUserByEmail(email);
    
    const token = `token_${usuario.id}_${Date.now()}`;
    
    return {
        token
    };
};

export const verifyToken = async (token) => {
    if (!token || !token.startsWith('token_')) {
        throw new Error('Token inválido');
    }
    
    const parts = token.split('_');
    if (parts.length !== 3) {
        throw new Error('Token inválido');
    }
    
    const userId = parseInt(parts[1]);
    const usuario = getUserById(userId);
    
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

export const getUserProfile = async (userId) => {
    const usuario = getUserById(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return usuario;
};

export const changePassword = async (userId, oldPassword, newPassword) => {
    const usuario = getUserById(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    if (oldPassword !== usuario.password) {
        throw new Error('Contraseña actual incorrecta');
    }

    if (newPassword === oldPassword) {
        throw new Error('La nueva contraseña no puede ser igual a la contraseña actual');
    }
    
    const errors = validateUser({ ...usuario, password: newPassword });
    
    if (errors.length > 0) {
        throw new Error(`Nueva contraseña inválida: ${errors.join(', ')}`);
    }
    
    updateUserPassword(userId, newPassword);
    
    return { message: 'Contraseña cambiada exitosamente' };
};

export const getUserBasicInfoById = async (userId) => {
    const usuario = getUserById(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    return usuario;
};

export const getAllUsersInfo = async () => {
    return getAllUsers();
};

