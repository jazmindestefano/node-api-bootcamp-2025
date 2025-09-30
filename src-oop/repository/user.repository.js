// VERSIÓN OOP - Programación Orientada a Objetos
// Clase para manejar operaciones de base de datos

import { User } from '../models/user.model.js';

export class UserRepository {
    constructor() {
        // Estado privado de la clase   
        this._usuarios = [
            new User({
                id: 1,
                nombre: "Admin",
                email: "admin@email.com",
                password: "123456",
                createdAt: "2024-01-01T00:00:00.000Z"
            })
        ];
    }
    
    // Método para obtener usuario por ID sin contraseña
    getUserById(id) {
        const usuario = this._usuarios.find(user => user.id === parseInt(id));
        return usuario ? usuario.toSafeObject() : null;
    }
    
    // Método para obtener usuario por email sin contraseña
    getUserByEmail(email) {
        const usuario = this._usuarios.find(user => user.email === email);
        return usuario ? usuario.toSafeObject() : null;
    }
    
    // Método para crear nuevo usuario
    createUser(userData) {
        const nuevoUsuario = new User(userData);
        this._usuarios.push(nuevoUsuario);
        return nuevoUsuario.toSafeObject();
    }
    
    // Método para verificar si email existe
    emailExists(email) {
        return this._usuarios.some(user => user.email === email);
    }
    
    // Método para actualizar contraseña de usuario
    updateUserPassword(id, newPassword) {
        const usuario = this.getUserByIdWithPassword(id);
        if (usuario) {
            usuario.changePassword(newPassword);
            return true;
        }
        return false;
    }
}
