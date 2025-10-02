// VERSIÓN OOP - Programación Orientada a Objetos
// Clase para manejar lógica de autenticación

import { UserRepository } from '../repository/user.repository.js';
import { User } from '../models/user.model.js';

export class AuthService {
    constructor() {
        // Inyección de dependencia
        this.userRepository = new UserRepository();
    }
    
    // Método para registrar usuario
    async registerUser(userData) {
        const { nombre, email, password } = userData;
        
        // Crear instancia temporal para validar
        const tempUser = new User({ nombre, email, password });
        const errors = tempUser.validate();
        
        if (errors.length > 0) {
            throw new Error(`Datos inválidos: ${errors.join(', ')}`);
        }
        
        // Verificar si email existe
        if (this.userRepository.emailExists(email)) {
            throw new Error('El email ya está registrado');
        }
        
        // Crear usuario
        return this.userRepository.createUser({ nombre, email, password });
    }
    
    // Método para hacer login
    async loginUser(email, password) {
        // Para login necesitamos verificar la contraseña, pero no devolverla
        // Usamos emailExists para verificar que el usuario existe
        if (!this.userRepository.emailExists(email)) {
            throw new Error('Email o contraseña incorrectos');
        }
        
        // En un caso real, aquí harías la verificación de contraseña
        // Por simplicidad, asumimos que la contraseña es correcta
        const usuario = this.userRepository.getUserByEmail(email);
        
        const token = this._generateToken(usuario);
        
        return {
            token
        };
    }
    
    
    // Método para obtener perfil de usuario
    async getUserProfile(userId) {
        const usuario = this.userRepository.getUserById(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        return usuario;
    }
    
    // Método para obtener usuario por email (sin contraseña)
    async getUserByEmail(email) {
        const usuario = this.userRepository.getUserByEmail(email);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        return usuario;
    }
    
    // Método privado para generar token
    _generateToken(user) {
        return `token_${user.id}_${Date.now()}`;
    }
    
    // Método privado para validar formato de token
    _isValidTokenFormat(token) {
        return token && token.startsWith('token_');
    }
    
    // Método privado para extraer ID del token
    _extractUserIdFromToken(token) {
        const parts = token.split('_');
        if (parts.length !== 3) {
            throw new Error('Token inválido');
        }
        return parseInt(parts[1]);
    }
    
    // Método para cambiar contraseña
    async changePassword(userId, oldPassword, newPassword) {
        const usuario = this.userRepository.getUserById(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Obtener usuario con contraseña para validar
        const usuarioConPassword = this.userRepository.getUserByIdWithPassword(userId);
        
        if (oldPassword !== usuarioConPassword.password) {
            throw new Error('Contraseña actual incorrecta');
        }

        if (newPassword === oldPassword) {
            throw new Error('La nueva contraseña no puede ser igual a la contraseña actual');
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
        
        // Verificar si el usuario existe
        const existingUser = this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        
        // Verificar si el email ya existe en otro usuario
        if (email !== existingUser.email && this.userRepository.emailExists(email)) {
            throw new Error('El email ya está registrado por otro usuario');
        }
        
        return this.userRepository.updateUser(userId, { nombre, email, password });
    }

    // Método para actualizar usuario parcialmente (PATCH)
    async updateUserPartial(userId, userData) {
        // Verificar si el usuario existe
        const existingUser = this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        
        // Validar solo los campos que se están actualizando
        const fieldsToValidate = {};
        if (userData.nombre) fieldsToValidate.nombre = userData.nombre;
        if (userData.email) fieldsToValidate.email = userData.email;
        if (userData.password) fieldsToValidate.password = userData.password;
        
        if (Object.keys(fieldsToValidate).length > 0) {
            const tempUser = new User(fieldsToValidate);
            const errors = tempUser.validate();
            
            if (errors.length > 0) {
                throw new Error(`Datos inválidos: ${errors.join(', ')}`);
            }
        }
        
        // Verificar si el email ya existe en otro usuario
        if (userData.email && userData.email !== existingUser.email && this.userRepository.emailExists(userData.email)) {
            throw new Error('El email ya está registrado por otro usuario');
        }
        
        return this.userRepository.patchUser(userId, userData);
    }

    // Método para eliminar usuario (DELETE)
    async deleteUserById(userId) {
        // Verificar si el usuario existe
        const existingUser = this.userRepository.getUserById(userId);
        if (!existingUser) {
            throw new Error('Usuario no encontrado');
        }
        
        return this.userRepository.deleteUser(userId);
    }
}
