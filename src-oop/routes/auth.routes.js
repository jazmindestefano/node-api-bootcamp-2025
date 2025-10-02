// VERSIÓN OOP - Programación Orientada a Objetos
// Controlador como clase

import express from "express";
import { AuthService } from "../service/auth.service.js";
import { handleError, validateInput } from "../utils/validation.utils.js";

export class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.router = express.Router();
        this._setupRoutes();
    }
    
    // Método privado para configurar rutas
    _setupRoutes() {
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.login.bind(this));
    }
    
    // Método para manejar registro
    async register(req, res) {
        try {
            const { nombre, email, password } = req.body;
            
            const missingFields = validateInput(req, ['nombre', 'email', 'password']);
            if (missingFields.length > 0) {
                return handleError(
                    new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), 
                    res
                );
            }
            
            const usuario = await this.authService.registerUser({ nombre, email, password });
            
            res.status(201).json({
                success: true,
                message: 'Usuario registrado correctamente',
                data: usuario
            });
            
        } catch (error) {
            handleError(error, res);
        }
    }
    
    // Método para manejar login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            const missingFields = validateInput(req, ['email', 'password']);
            if (missingFields.length > 0) {
                return handleError(
                    new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), 
                    res
                );
            }
            
            const result = await this.authService.loginUser(email, password);
            
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
    }
    
    // Método privado para validar header de autorización
    _validateAuthHeader(authHeader) {
        return authHeader && authHeader.startsWith('Bearer ');
    }
    
    // Método para obtener el router
    getRouter() {
        return this.router;
    }
}

