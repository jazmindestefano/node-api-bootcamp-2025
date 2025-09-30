// Estructura del modelo de usuario
export const UserModel = {
    // Campos requeridos
    requiredFields: ['nombre', 'email', 'password'],
    
    // Patrones de validación
    patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    
    // Longitudes mínimas
    minLengths: {
        password: 6
    }
};

