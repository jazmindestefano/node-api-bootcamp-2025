import express from "express";
import { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    getUserCount 
} from "../repository/user.repository.js";
import { User } from "../models/user.model.js";

const router = express.Router();

// GET /api/users - Obtener todos los usuarios
router.get('/', (req, res) => {
    try {
        const usuarios = getAllUsers();
        res.json({
            message: 'Usuarios obtenidos correctamente',
            total: usuarios.length,
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener usuarios',
            error: error.message
        });
    }
});

// GET /api/users/count - Obtener cantidad de usuarios
router.get('/count', (req, res) => {
    try {
        const total = getUserCount();
        res.json({
            message: 'Conteo de usuarios obtenido',
            total
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener conteo',
            error: error.message
        });
    }
});

// GET /api/users/:id - Obtener usuario por ID
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const usuario = getUserById(id);
        
        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        
        res.json({
            message: 'Usuario encontrado',
            usuario
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener usuario',
            error: error.message
        });
    }
});

// POST /api/users - Crear nuevo usuario
router.post('/', (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Validar datos básicos
        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: 'Faltan datos: nombre, email y password son obligatorios'
            });
        }
        
        // Crear instancia del modelo para validar
        const nuevoUsuario = new User({ nombre, email, password });
        const errores = nuevoUsuario.validate();
        
        if (errores.length > 0) {
            return res.status(400).json({
                message: 'Datos inválidos',
                errores
            });
        }
        
        // Crear usuario usando el repository
        const usuarioCreado = createUser({ nombre, email, password });
        
        res.status(201).json({
            message: 'Usuario creado correctamente',
            usuario: usuarioCreado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear usuario',
            error: error.message
        });
    }
});

// PUT /api/users/:id - Actualizar usuario completo
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        
        // Validar que el usuario existe
        const usuarioExistente = getUserById(id);
        if (!usuarioExistente) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        
        // Validar datos si se proporcionan
        if (nombre || email || password) {
            const datosValidar = {
                nombre: nombre || usuarioExistente.nombre,
                email: email || usuarioExistente.email,
                password: password || 'temp123' // Password temporal para validación
            };
            
            const nuevoUsuario = new User(datosValidar);
            const errores = nuevoUsuario.validate();
            
            if (errores.length > 0) {
                return res.status(400).json({
                    message: 'Datos inválidos',
                    errores
                });
            }
        }
        
        // Actualizar usuario
        const usuarioActualizado = updateUser(id, { nombre, email, password });
        
        res.json({
            message: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar usuario',
            error: error.message
        });
    }
});

// PATCH /api/users/:id - Actualizar usuario parcialmente
router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;
        
        // Validar que el usuario existe
        const usuarioExistente = getUserById(id);
        if (!usuarioExistente) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        
        // Actualizar solo los campos proporcionados
        const usuarioActualizado = updateUser(id, datosActualizar);
        
        res.json({
            message: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar usuario',
            error: error.message
        });
    }
});

// DELETE /api/users/:id - Eliminar usuario
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        
        // Verificar que el usuario existe
        const usuarioExistente = getUserById(id);
        if (!usuarioExistente) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        
        // Eliminar usuario
        const eliminado = deleteUser(id);
        
        if (eliminado) {
            res.json({
                message: 'Usuario eliminado correctamente'
            });
        } else {
            res.status(500).json({
                message: 'Error al eliminar usuario'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar usuario',
            error: error.message
        });
    }
});

export default router;
