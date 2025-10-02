import { generateUserId, generateTimestamp, isValidEmailFormat, isValidPasswordLength } from '../utils/user.utils.js';

export class User {
    constructor(userData) {
        this.id = userData.id || generateUserId();
        this.nombre = userData.nombre;
        this.email = userData.email;
        this.password = userData.password;
        this.createdAt = userData.createdAt || generateTimestamp();
    }
    
    // Método para obtener usuario sin contraseña
    toSafeObject() {
        const { password, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }
    
    // Método para validar datos del usuario
    validate() {
        const errors = [];
        
        // Validar solo los campos que están presentes
        if (this.nombre !== undefined) {
            if (!this.nombre || this.nombre.trim().length === 0) {
                errors.push('El nombre es obligatorio');
            }
        }
        
        if (this.email !== undefined) {
            if (!this.email || this.email.trim().length === 0) {
                errors.push('El email es obligatorio');
            } else if (!isValidEmailFormat(this.email)) {
                errors.push('El formato del email no es válido');
            }
        }
        
        if (this.password !== undefined) {
            if (!this.password || this.password.trim().length === 0) {
                errors.push('La contraseña es obligatoria');
            } else if (!isValidPasswordLength(this.password)) {
                errors.push('La contraseña debe tener al menos 6 caracteres');
            }
        }
        
        return errors;
    }
    
    // Método para cambiar contraseña
    changePassword(newPassword) {
        this.password = newPassword;
        return this;
    }
    
    // Método para obtener información básica
    getBasicInfo() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            createdAt: this.createdAt
        };
    }
}
