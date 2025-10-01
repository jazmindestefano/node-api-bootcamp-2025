import express from "express";
import { registerUser, loginUser, verifyToken, getUserBasicInfoById, getAllUsersInfo } from "../service/auth.service.js";
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

// VERIFICAR TOKEN - GET /api/auth/verify
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return handleError(new Error('Token de autorización requerido'), res);
        }
        
        const token = authHeader.substring(7);
        const usuario = await verifyToken(token);
        
        res.json({
            message: 'Token válido',
            usuario
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

export default router;
