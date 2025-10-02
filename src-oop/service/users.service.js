// VERSIÓN OOP - Programación Orientada a Objetos
// Servicio para manejar operaciones de usuarios

import { UserRepository } from '../repository/user.repository.js';
import { User } from '../models/user.model.js';

export class UsersService {
    constructor() {
        // Inyección de dependencia
        this.userRepository = new UserRepository();
    }
    
    // Método para obtener información básica de usuario por ID
    async getUserBasicInfoById(userId) {
        const usuario = this.userRepository.getUserById(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        return usuario;
    }
    
    // Método para obtener todos los usuarios
    async getAllUsersInfo() {
        return this.userRepository.getAllUsers();
    }
    
    // Método para actualizar usuario completamente (PUT)
    async updateUserComplete(userId, userData) {
        const { nombre, email, password } = userData;
        
        // Crear instancia temporal para validar
        const tempUser = new User({ nombre, email, password });
        const errors = tempUser.validate();
        
        if (errors.length > 0) {
            throw new Error(`Datos inválidos: ${errors.join(', ')}`);
        }
        
        const existingUser = this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        
        if (email !== existingUser.email && this.userRepository.emailExists(email)) {
            throw new Error('El email ya está registrado por otro usuario');
        }
        
        return this.userRepository.updateUser(userId, { nombre, email, password });
    }
    
    // Método para actualizar usuario parcialmente (PATCH)
    async updateUserPartial(userId, userData) {
        const existingUser = this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        
        // Validar solo los campos que se están actualizando
        const fieldsToValidate = {};
        if (userData.nombre !== undefined) fieldsToValidate.nombre = userData.nombre;
        if (userData.email !== undefined) fieldsToValidate.email = userData.email;
        if (userData.password !== undefined) fieldsToValidate.password = userData.password;
        
        if (Object.keys(fieldsToValidate).length > 0) {
            const tempUser = new User(fieldsToValidate);
            const errors = tempUser.validate();
            
            if (errors.length > 0) {
                throw new Error(`Datos inválidos: ${errors.join(', ')}`);
            }
        }
        
        if (userData.email && userData.email !== existingUser.email && this.userRepository.emailExists(userData.email)) {
            throw new Error('El email ya está registrado por otro usuario');
        }
        
        return this.userRepository.patchUser(userId, userData);
    }
    
    // Método para eliminar usuario
    async deleteUserById(userId) {
        const existingUser = this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        
        return this.userRepository.deleteUser(userId);
    }
    
    // Método para cambiar contraseña
    async changePassword(userId, oldPassword, newPassword) {
        const usuario = this.userRepository.getUserById(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Obtener usuario con contraseña para verificar
        const usuarioConPassword = this.userRepository.getUserByIdWithPassword(userId);
        
        if (oldPassword !== usuarioConPassword.password) {
            throw new Error('Contraseña actual incorrecta');
        }

        if (newPassword === oldPassword) {
            throw new Error('La nueva contraseña no puede ser igual a la actual');
        }
        
        // Validar nueva contraseña
        const tempUser = new User({ ...usuario, password: newPassword });
        const errors = tempUser.validate();
        
        if (errors.length > 0) {
            throw new Error(`Nueva contraseña inválida: ${errors.join(', ')}`);
        }
        
        this.userRepository.updateUserPassword(userId, newPassword);
        return { message: 'Contraseña cambiada exitosamente' };
    }
}
