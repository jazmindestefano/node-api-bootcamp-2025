import { 
    getUserById,
    getAllUsers,
    updateUser,
    patchUser,
    deleteUser,
    emailExists
} from '../repository/user.repository.js';
import { validateUser } from '../models/user.model.js';

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

export const updateUserComplete = async (userId, userData) => {
    const { nombre, email, password } = userData;
    
    const errors = validateUser({ nombre, email, password });
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    const existingUser = getUserById(userId);
    if (!existingUser) {
        throw new Error('Usuario no encontrado');
    }
    
    if (email !== existingUser.email && emailExists(email)) {
        throw new Error('El email ya está registrado por otro usuario');
    }
    
    return updateUser(userId, { nombre, email, password });
};

export const updateUserPartial = async (userId, userData) => {
    const existingUser = getUserById(userId);
    if (!existingUser) {
        throw new Error('Usuario no encontrado');
    }
    
    const fieldsToValidate = {};
    if (userData.nombre !== undefined) fieldsToValidate.nombre = userData.nombre;
    if (userData.email !== undefined) fieldsToValidate.email = userData.email;
    if (userData.password !== undefined) fieldsToValidate.password = userData.password;
    
    const errors = validateUser(fieldsToValidate);
    if (errors.length > 0) {
        throw new Error(`Datos inválidos: ${errors.join(', ')}`);
    }
    
    if (userData.email && userData.email !== existingUser.email && emailExists(userData.email)) {
        throw new Error('El email ya está registrado por otro usuario');
    }
    
    return patchUser(userId, userData);
};

export const deleteUserById = async (userId) => {
    const existingUser = getUserById(userId);
    if (!existingUser) {
        throw new Error('Usuario no encontrado');
    }
    
    return deleteUser(userId);
};

export const changePassword = async (userId, oldPassword, newPassword) => {
    const usuario = getUserById(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    // Aquí deberías obtener el usuario CON password para verificar
    // Por ahora es simplificado para el ejercicio
    
    if (newPassword === oldPassword) {
        throw new Error('La nueva contraseña no puede ser igual a la actual');
    }
    
    const errors = validateUser({ password: newPassword });
    if (errors.length > 0) {
        throw new Error(`Nueva contraseña inválida: ${errors.join(', ')}`);
    }
    
    return patchUser(userId, { password: newPassword });
};
