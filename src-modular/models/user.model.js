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

// Crear usuario (equivalente al constructor)
export const createUser = (userData) => {
    return {
        id: userData.id || Date.now(),
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        createdAt: userData.createdAt || new Date().toISOString()
    };
};

// Obtener usuario sin contraseña (equivalente a toSafeObject)
export const getUserWithoutPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

// Validar usuario (equivalente a validate)
export const validateUser = (userData) => {
    const errors = [];
    const { requiredFields, patterns, minLengths } = UserModel;
    
    // Validar campos requeridos
    requiredFields.forEach(field => {
        if (!userData[field] || userData[field].trim().length === 0) {
            errors.push(`El ${field} es obligatorio`);
        }
    });
    
    // Validar email
    if (userData.email && !patterns.email.test(userData.email)) {
        errors.push('El formato del email no es válido');
    }
    
    // Validar contraseña
    if (userData.password && userData.password.length < minLengths.password) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    return errors;
};

// Cambiar contraseña (equivalente a changePassword)
export const changeUserPassword = (user, newPassword) => {
    return {
        ...user,
        password: newPassword
    };
};

// Obtener información básica (equivalente a getBasicInfo)
export const getUserBasicInfo = (user) => {
    return {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        createdAt: user.createdAt
    };
};

