// Utilidades para manejo de usuarios
// Re-exportar funciones del model para mantener compatibilidad
export { 
    createUser, 
    getUserWithoutPassword, 
    validateUser,
    changeUserPassword,
    getUserBasicInfo
} from '../models/user.model.js';
