import express from "express";
import { 
    registerUser, 
    loginUser, 
    getUserBasicInfoById, 
    getAllUsersInfo,
    updateUserComplete,
    updateUserPartial,
    deleteUserById
} from "../service/auth.service.js";
import { validateInput, handleError } from "../utils/validation.utils.js";

const router = express.Router();

// REGISTRO - POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        const missingFields = validateInput(req, ['nombre', 'email', 'password']);
        if (missingFields.length > 0) {
            return handleError(new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), res);
        }
        
        const usuario = await registerUser({ nombre, email, password });
        
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            usuario
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

// LOGIN - POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const missingFields = validateInput(req, ['email', 'password']);
        if (missingFields.length > 0) {
            return handleError(new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), res);
        }
        
        const result = await loginUser(email, password);
        
        res.json({
            message: 'Login exitoso',
            usuario: result.usuario,
            token: result.token
        });
        
    } catch (error) {
        handleError(error, res);
    }
});


// GET USER BASIC INFO BY ID - GET /api/auth/user-basic-info/:id
router.get('/user-basic-info/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getUserBasicInfoById(id);

        res.json({
            message: 'Información básica del usuario',
            usuario
        });

    } catch (error) {
        handleError(error, res);
    }
});

// GET ALL USERS INFO - GET /api/auth/all-users-info
router.get('/all-users-info', async (req, res) => {
    try {
        const usuarios = await getAllUsersInfo();

        res.json({
            message: 'Información de todos los usuarios',
            usuarios
        });

    } catch (error) {
        handleError(error, res);
    }
});

// ACTUALIZAR USUARIO COMPLETAMENTE - PUT /api/auth/users/:id
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password } = req.body;
        
        const missingFields = validateInput(req, ['nombre', 'email', 'password']);
        if (missingFields.length > 0) {
            return handleError(new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), res);
        }
        
        const usuario = await updateUserComplete(id, { nombre, email, password });
        
        res.json({
            message: 'Usuario actualizado completamente',
            usuario
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

// ACTUALIZAR USUARIO PARCIALMENTE - PATCH /api/auth/users/:id
router.patch('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        
        if (Object.keys(userData).length === 0) {
            return handleError(new Error('No se proporcionaron datos para actualizar'), res);
        }
        
        const usuario = await updateUserPartial(id, userData);
        
        res.json({
            message: 'Usuario actualizado parcialmente',
            usuario
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

// ELIMINAR USUARIO - DELETE /api/auth/users/:id
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const usuario = await deleteUserById(id);
        
        res.json({
            message: 'Usuario eliminado correctamente',
            usuario
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

export default router;
