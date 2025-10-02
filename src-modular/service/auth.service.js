import { 
    createNewUser, 
    getUserByEmail,
    emailExists
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
    
    // En producción aquí verificarías la contraseña hasheada
    // Por ahora es solo educativo
    
    const token = `token_${usuario.id}_${Date.now()}`;
    
    return {
        usuario,
        token
    };
};
