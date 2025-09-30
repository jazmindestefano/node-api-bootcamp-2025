// Modelo de Usuario - Define la estructura de datos
export class User {
    constructor(userData) {
        this.id = userData.id || Date.now();
        this.nombre = userData.nombre;
        this.email = userData.email;
        this.password = userData.password; // En producción esto estaría encriptado
        this.createdAt = userData.createdAt || new Date().toISOString();
    }
    
    // Método para obtener el usuario sin la contraseña
    toSafeObject() {
        const { password, ...usuarioSinPassword } = this;
        return usuarioSinPassword;
    }
    
    // Método para validar datos básicos
    validate() {
        const errors = [];
        
        if (!this.nombre || this.nombre.trim().length === 0) {
            errors.push('El nombre es obligatorio');
        }
        
        if (!this.email || this.email.trim().length === 0) {
            errors.push('El email es obligatorio');
        }
        
        if (!this.password || this.password.length < 6) {
            errors.push('La contraseña debe tener al menos 6 caracteres');
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.email && !emailRegex.test(this.email)) {
            errors.push('El formato del email no es válido');
        }
        
        return errors;
    }
}
