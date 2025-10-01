export const UserModel = {
    requiredFields: ['nombre', 'email', 'password'],
    patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    minLengths: {
        password: 6
    }
};

export const createUser = (userData) => {
    return {
        id: userData.id || Date.now(),
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().toISOString()
    };
};

export const getUserWithoutPassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const validateUser = (userData) => {
    const errors = [];
    const { requiredFields, patterns, minLengths } = UserModel;
    
    requiredFields.forEach(field => {
        if (!userData[field] || userData[field].trim().length === 0) {
            errors.push(`El ${field} es obligatorio`);
        }
    });
    
    if (userData.email && !patterns.email.test(userData.email)) {
        errors.push('El formato del email no es válido');
    }
    
    if (userData.password && userData.password.length < minLengths.password) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    return errors;
};

export const changeUserPassword = (user, newPassword) => {
    return {
        ...user,
        password: newPassword
    };
};

export const getUserBasicInfo = (user) => {
    return {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        createdAt: user.createdAt
    };
};

