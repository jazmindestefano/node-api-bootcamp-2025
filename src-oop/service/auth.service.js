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
            usuario,
            token
        };
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
}
