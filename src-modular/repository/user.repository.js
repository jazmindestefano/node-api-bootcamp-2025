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

export const updateUser = (id, userData) => {
    const index = usuarios.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
        usuarios[index] = { 
            ...usuarios[index], 
            ...userData, 
            id: parseInt(id),
            createdAt: usuarios[index].createdAt
        };
        return getUserWithoutPassword(usuarios[index]);
    }
    return null;
};

export const patchUser = (id, userData) => {
    const index = usuarios.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
        usuarios[index] = { 
            ...usuarios[index], 
            ...userData 
        };
        return getUserWithoutPassword(usuarios[index]);
    }
    return null;
};

export const deleteUser = (id) => {
    const index = usuarios.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
        const deletedUser = usuarios.splice(index, 1)[0];
        return getUserWithoutPassword(deletedUser);
    }
    return null;
};
