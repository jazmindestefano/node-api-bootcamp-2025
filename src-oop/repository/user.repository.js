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

    // Método para obtener usuario por ID con contraseña (para validaciones internas)
    getUserByIdWithPassword(id) {
        return this._usuarios.find(user => user.id === parseInt(id)) || null;
    }

    // Método para obtener todos los usuarios sin contraseña
    getAllUsers() {
        return this._usuarios.map(user => user.toSafeObject());
    }

    // Método para actualizar usuario completamente (PUT)
    updateUser(id, userData) {
        const userFound = this.getUserById(id);
        if (userFound) {
            this._usuarios[index] = new User({ ...userFound, ...userData, id: parseInt(id) });
            return this._usuarios[index].toSafeObject();
        }
        return null;
    }

    // Método para actualizar usuario parcialmente (PATCH)
    patchUser(id, userData) {
        const userFound = this.getUserById(id);
        if (userFound) {
            this._usuarios[index] = new User({ ...userFound, ...userData });
            return this._usuarios[index].toSafeObject();
        }
        return null;
    }

    // Método para eliminar usuario (DELETE)
    deleteUser(id) {
        const userFound = this.getUserById(id);
        if (userFound) {
            const deletedUser = this._usuarios.splice(userFound, 1)[0];
            return deletedUser.toSafeObject();
        }
        return null;
    }
}
