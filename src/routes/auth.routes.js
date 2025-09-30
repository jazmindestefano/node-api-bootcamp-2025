import express from "express";
import { registerUser, loginUser, verifyToken } from "../service/auth.service.js";

const router = express.Router();

// REGISTRO - POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Validar datos básicos
        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: 'Faltan datos: nombre, email y password son obligatorios'
            });
        }
        
        // Registrar usuario usando el servicio
        const usuario = await registerUser({ nombre, email, password });
        
        res.status(201).json({
            message: 'Usuario registrado correctamente',
            usuario
        });
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// LOGIN - POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validar datos básicos
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y password son obligatorios'
            });
        }
        
        // Hacer login usando el servicio
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
