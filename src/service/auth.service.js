import { 
    createUser, 
    getUserByEmailWithPassword, 
    emailExists,
    getUserByIdWithPassword 
} from '../repository/user.repository.js';

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
    const { nombre, email, password } = userData;
    
    // Verificar si el email ya existe
    if (emailExists(email)) {
        throw new Error('El email ya está registrado');
    }
    
    // Crear el nuevo usuario
    const nuevoUsuario = createUser({
        nombre,
        email,
        password // En producción esto estaría encriptado
    });
    
    // Devolver el usuario sin la contraseña
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;
    return usuarioSinPassword;
};

// Función para hacer login
export const loginUser = async (email, password) => {
    // Buscar el usuario por email (con contraseña)
    const usuario = getUserByEmailWithPassword(email);
    
    if (!usuario) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    // Verificar la contraseña (en producción esto sería con hash)
    if (usuario.password !== password) {
        throw new Error('Email o contraseña incorrectos');
    }
    
    // Generar un token simple (en producción sería JWT)
    const token = `token_${usuario.id}_${Date.now()}`;
    
    // Devolver el usuario sin la contraseña y el token
    return {
        usuario: usuario.toSafeObject(),
        token
    };
};

// Función para verificar un token
export const verifyToken = async (token) => {
    // Verificar formato básico del token
    if (!token || !token.startsWith('token_')) {
        throw new Error('Token inválido');
    }
    
    // Extraer el ID del usuario del token
    const parts = token.split('_');
    if (parts.length !== 3) {
        throw new Error('Token inválido');
    }
    
    const userId = parseInt(parts[1]);
    const usuario = getUserByIdWithPassword(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    // Devolver el usuario sin la contraseña
    return usuario.toSafeObject();
};

// Función para obtener perfil de usuario
export const getUserProfile = async (userId) => {
    const usuario = getUserByIdWithPassword(userId);
    
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    // Devolver el usuario sin la contraseña
    return usuario.toSafeObject();
};
