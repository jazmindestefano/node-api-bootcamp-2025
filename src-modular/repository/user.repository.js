import { createUser, getUserWithoutPassword } from '../models/user.model.js';

let usuarios = [];

export const getAllUsers = () => {
    return usuarios.map(user => getUserWithoutPassword(user));
};

export const getUserById = (id) => {
    const usuario = usuarios.find(user => user.id === parseInt(id));
    return usuario ? getUserWithoutPassword(usuario) : null;
};

export const getUserByEmail = (email) => {
    const usuario = usuarios.find(user => user.email === email);
    return usuario ? getUserWithoutPassword(usuario) : null;
};

export const createNewUser = (userData) => {
    const nuevoUsuario = createUser(userData);
    usuarios.push(nuevoUsuario);
    return getUserWithoutPassword(nuevoUsuario);
};

export const emailExists = (email) => {
    return usuarios.some(user => user.email === email);
};

export const updateUserPassword = (id, newPassword) => {
    let userFound = getUserById(id);
    if (userFound) {
        userFound.password = newPassword;
        return true;
    }

    return false;
};

// Actualizar usuario completamente (PUT)
export const updateUser = (id, userData) => {
    const userFound = getUserById(id);
    if (userFound) {
        usuarios[index] = { ...userFound, ...userData, id: parseInt(id) };
        return getUserWithoutPassword(usuarios[index]);
    }
    return null;
};

// Actualizar usuario parcialmente (PATCH)
export const patchUser = (id, userData) => {
    const userFound = getUserById(id);
    if (userFound) {
        usuarios[index] = { ...userFound, ...userData };
        return getUserWithoutPassword(usuarios[index]);
    }
    return null;
};

// Eliminar usuario (DELETE)
export const deleteUser = (id) => {
    const userFound = getUserById(id);
    if (userFound) {
        const deletedUser = usuarios.splice(userFound, 1)[0];
        return getUserWithoutPassword(deletedUser);
    }
    return null;
};
