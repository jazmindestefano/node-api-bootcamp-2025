// Utilidades para manejo de usuarios en OOP
// En OOP, las utilidades son métodos estáticos o funciones helper

// Función helper para generar ID único
export const generateUserId = () => {
    return Date.now();
};

// Función helper para generar timestamp
export const generateTimestamp = () => {
    return new Date().toISOString();
};

// Función helper para validar formato de email
export const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Función helper para validar longitud de contraseña
export const isValidPasswordLength = (password, minLength = 6) => {
    return password && password.length >= minLength;
};
