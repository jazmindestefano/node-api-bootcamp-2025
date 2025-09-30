// VERSIÓN OOP - Programación Orientada a Objetos
// Controlador como clase

import express from "express";
import { AuthService } from "../service/auth.service.js";

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
        this.router.get('/verify', this.verify.bind(this));
    }
    
    // Método para manejar registro
    async register(req, res) {
        try {
            const { nombre, email, password } = req.body;
            
            // Validar datos básicos
            if (!this._validateRequiredFields(req, ['nombre', 'email', 'password'])) {
                return res.status(400).json({
                    message: 'Faltan datos: nombre, email y password son obligatorios'
                });
            }
            
            // Registrar usuario usando el servicio
            const usuario = await this.authService.registerUser({ nombre, email, password });
            
            res.status(201).json({
                message: 'Usuario registrado correctamente',
                usuario
            });
            
        } catch (error) {
            this._handleError(error, res);
        }
    }
    
    // Método para manejar login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Validar datos básicos
            if (!this._validateRequiredFields(req, ['email', 'password'])) {
                return res.status(400).json({
                    message: 'Faltan datos: email y password son obligatorios'
                });
            }
            
            // Hacer login usando el servicio
            const result = await this.authService.loginUser(email, password);
            
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
    }
    
    // Método para verificar token
    async verify(req, res) {
        try {
            const authHeader = req.headers.authorization;
            
            if (!this._validateAuthHeader(authHeader)) {
                return res.status(401).json({
                    message: 'Token de autorización requerido'
                });
            }
            
            const token = authHeader.substring(7);
            const usuario = await this.authService.verifyToken(token);
            
            res.json({
                message: 'Token válido',
                usuario
            });
            
        } catch (error) {
            res.status(401).json({
                message: error.message
            });
        }
    }
    
    // Método privado para validar campos requeridos
    _validateRequiredFields(req, requiredFields) {
        return requiredFields.every(field => req.body[field]);
    }
    
    // Método privado para validar header de autorización
    _validateAuthHeader(authHeader) {
        return authHeader && authHeader.startsWith('Bearer ');
    }
    
    // Método privado para manejar errores
    _handleError(error, res) {
        console.error('Error:', error.message);
        res.status(400).json({
            message: error.message
        });
    }
    
    // Método para obtener el router
    getRouter() {
        return this.router;
    }
}
