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
        this.router.get('/verify', this.verify.bind(this));
        this.router.get('/user-basic-info/:id', this.getUserBasicInfoById.bind(this));
        this.router.get('/all-users-info', this.getAllUsersInfo.bind(this));
    }
    
    // Método para manejar registro
    async register(req, res) {
        try {
            const { nombre, email, password } = req.body;
            
            // Validar datos básicos
            const missingFields = validateInput(req, ['nombre', 'email', 'password']);
            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: `Faltan datos: ${missingFields.join(', ')} son obligatorios`
                });
            }
            
            // Registrar usuario usando el servicio
            const usuario = await this.authService.registerUser({ nombre, email, password });
            
            res.status(201).json({
                message: 'Usuario registrado correctamente',
                usuario
            });
            
        } catch (error) {
            handleError(error, res);
        }
    }
    
    // Método para manejar login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Validar datos básicos
            const missingFields = validateInput(req, ['email', 'password']);
            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: `Faltan datos: ${missingFields.join(', ')} son obligatorios`
                });
            }
            
            // Hacer login usando el servicio
            const result = await this.authService.loginUser(email, password);
            
            res.json({
                message: 'Login exitoso',
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

    // Método para obtener información básica de usuario por ID
    async getUserBasicInfoById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this.authService.getUserBasicInfoById(id);
            
            res.json({
                message: 'Información básica del usuario',
                usuario
            });

        } catch (error) {
            handleError(error, res);
        }
    }

    // Método para obtener todos los usuarios
    async getAllUsersInfo(req, res) {
        try {
            const usuarios = await this.authService.getAllUsersInfo();

            res.json({
                message: 'Información de todos los usuarios',
                usuarios
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
