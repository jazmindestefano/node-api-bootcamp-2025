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
        const usuario = this.userRepository.getUserByEmailWithPassword(email);
        
        if (!usuario) {
            throw new Error('Email o contraseña incorrectos');
        }
        
        if (usuario.password !== password) {
            throw new Error('Email o contraseña incorrectos');
        }
        
        const token = this._generateToken(usuario);
        
        return {
            usuario: usuario.getBasicInfo(),
            token
        };
    }
    
    // Método para verificar token
    async verifyToken(token) {
        if (!this._isValidTokenFormat(token)) {
            throw new Error('Token inválido');
        }
        
        const userId = this._extractUserIdFromToken(token);
        const usuario = this.userRepository.getUserByIdWithPassword(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        return usuario.getBasicInfo();
    }
    
    // Método para obtener perfil de usuario
    async getUserProfile(userId) {
        const usuario = this.userRepository.getUserById(userId);
        
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
        const usuario = this.userRepository.getUserByIdWithPassword(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        if (usuario.password !== oldPassword) {
            throw new Error('Contraseña actual incorrecta');
        }
        
        // Validar nueva contraseña
        const tempUser = new User({ ...usuario, password: newPassword });
        const errors = tempUser.validate();
        
        if (errors.length > 0) {
            throw new Error(`Nueva contraseña inválida: ${errors.join(', ')}`);
        }
        
        usuario.changePassword(newPassword);
        return { message: 'Contraseña cambiada exitosamente' };
    }
}
