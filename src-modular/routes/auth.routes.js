// VERSIÓN MODULAR - Programación Funcional
// Controladores como funciones puras

import express from "express";
import { registerUser, loginUser, verifyToken } from "../service/auth.service.js";

const router = express.Router();

// Función pura para manejar errores
const handleError = (error, res) => {
    console.error('Error:', error.message);
    res.status(400).json({
        message: error.message
    });
};

// Función pura para validar datos de entrada
const validateInput = (req, requiredFields) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    return missingFields;
};

// REGISTRO - POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Validar datos básicos
        const missingFields = validateInput(req, ['nombre', 'email', 'password']);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Faltan datos: ${missingFields.join(', ')} son obligatorios`
            });
        }
        
        // Registrar usuario
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
        
        // Validar datos básicos
        const missingFields = validateInput(req, ['email', 'password']);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Faltan datos: ${missingFields.join(', ')} son obligatorios`
            });
        }
        
        // Hacer login
        const result = await loginUser(email, password);
        
        res.json({
            message: 'Login exitoso',
            usuario: result.usuario,
            token: result.token
        });
        
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
});

// VERIFICAR TOKEN - GET /api/auth/verify
router.get('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Token de autorización requerido'
            });
        }
        
        const token = authHeader.substring(7);
        const usuario = await verifyToken(token);
        
        res.json({
            message: 'Token válido',
            usuario
        });
        
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
});

export default router;
