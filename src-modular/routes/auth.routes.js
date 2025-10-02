import express from "express";
import { registerUser, loginUser } from "../service/auth.service.js";
import { validateInput, handleError } from "../utils/validation.utils.js";

const router = express.Router();

// REGISTRO - POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        const missingFields = validateInput(req, ['nombre', 'email', 'password']);
        if (missingFields.length > 0) {
            return handleError(
                new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), 
                res
            );
        }
        
        const usuario = await registerUser({ nombre, email, password });
        
        res.status(201).json({
            success: true,
            message: 'Usuario registrado correctamente',
            data: usuario
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
            return handleError(
                new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), 
                res
            );
        }
        
        const result = await loginUser(email, password);
        
        res.json({
            success: true,
            message: 'Login exitoso',
            data: {
                usuario: result.usuario,
                token: result.token
            }
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

export default router;
