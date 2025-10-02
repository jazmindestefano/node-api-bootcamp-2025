import { 
    createNewUser, 
    getUserByEmail,
    emailExists,
    getUserById,
    updateUserPassword,
    getAllUsers,
    updateUser,
    patchUser,
    deleteUser
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

// Actualizar usuario completamente (PUT)
export const updateUserComplete = async (userId, userData) => {
    const { nombre, email, password } = userData;
    
    // Validar datos completos
    const errors = validateUser({ nombre, email, password });
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    // Verificar si el usuario existe
    const existingUser = getUserById(userId);
    if (!existingUser) {
        throw new Error('Usuario no encontrado');
    }
    
    // Verificar si el email ya existe en otro usuario
    if (email !== existingUser.email && emailExists(email)) {
        throw new Error('El email ya está registrado por otro usuario');
    }
    
    return updateUser(userId, { nombre, email, password });
};

// Actualizar usuario parcialmente (PATCH)
export const updateUserPartial = async (userId, userData) => {
    // Verificar si el usuario existe
    const existingUser = getUserById(userId);
    if (!existingUser) {
        throw new Error('Usuario no encontrado');
    }
    
    // Validar solo los campos que se están actualizando
    const fieldsToValidate = {};
    if (userData.nombre) fieldsToValidate.nombre = userData.nombre;
    if (userData.email) fieldsToValidate.email = userData.email;
    if (userData.password) fieldsToValidate.password = userData.password;
    
    const errors = validateUser(fieldsToValidate);
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    // Verificar si el email ya existe en otro usuario
    if (userData.email && userData.email !== existingUser.email && emailExists(userData.email)) {
        throw new Error('El email ya está registrado por otro usuario');
    }
    
    return patchUser(userId, userData);
};

// Eliminar usuario (DELETE)
export const deleteUserById = async (userId) => {
    // Verificar si el usuario existe
    const existingUser = getUserById(userId);
    if (!existingUser) {
        throw new Error('Usuario no encontrado');
    }
    
    return deleteUser(userId);
};

