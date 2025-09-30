// Utilidades para manejo de usuarios
import { UserModel } from '../models/user.model.js';

// Crear un objeto usuario
export const createUser = (userData) => {
    return {
        id: userData.id || Date.now(),
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        createdAt: userData.createdAt || new Date().toISOString()
    };
};

// Obtener usuario sin contraseña
export const getUserWithoutPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

// Validar datos de usuario usando el modelo
export const validateUser = (userData) => {
    const errors = [];
    const { requiredFields, patterns, minLengths } = UserModel;
    
    // Validar campos requeridos
    requiredFields.forEach(field => {
        if (!userData[field] || userData[field].trim().length === 0) {
            errors.push(`El ${field} es obligatorio`);
        }
    });
    
    // Validar email
    if (userData.email && !patterns.email.test(userData.email)) {
        errors.push('El formato del email no es válido');
    }
    
    // Validar contraseña
    if (userData.password && userData.password.length < minLengths.password) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    return errors;
};
