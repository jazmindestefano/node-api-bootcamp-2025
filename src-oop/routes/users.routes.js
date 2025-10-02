// VERSIÓN OOP - Programación Orientada a Objetos
// Controlador para rutas de usuarios

import express from "express";
import { UsersService } from "../service/users.service.js";
import { handleError, validateInput } from "../utils/validation.utils.js";

export class UsersController {
    constructor() {
        this.usersService = new UsersService();
        this.router = express.Router();
        this._setupRoutes();
    }
    
    // Método privado para configurar rutas
    _setupRoutes() {
        this.router.get('/', this.getAllUsers.bind(this));
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.put('/:id', this.updateUserComplete.bind(this));
        this.router.patch('/:id', this.updateUserPartial.bind(this));
        this.router.patch('/:id/password', this.changePassword.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));
    }
    
    // GET ALL USERS - GET /api/users
    async getAllUsers(req, res) {
        try {
            const usuarios = await this.usersService.getAllUsersInfo();

            res.json({
                success: true,
                message: 'Lista de usuarios',
                data: usuarios,
                count: usuarios.length
            });

        } catch (error) {
            handleError(error, res);
        }
    }

    // GET USER BY ID - GET /api/users/:id
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this.usersService.getUserBasicInfoById(id);

            res.json({
                success: true,
                message: 'Información del usuario',
                data: usuario
            });

        } catch (error) {
            handleError(error, res);
        }
    }

    // UPDATE USER COMPLETE - PUT /api/users/:id
    async updateUserComplete(req, res) {
        try {
            const { id } = req.params;
            const { nombre, email, password } = req.body;
            
            const missingFields = validateInput(req, ['nombre', 'email', 'password']);
            if (missingFields.length > 0) {
                return handleError(
                    new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios para actualización completa`), 
                    res
                );
            }
            
            const usuario = await this.usersService.updateUserComplete(id, { nombre, email, password });
            
            res.json({
                success: true,
                message: 'Usuario actualizado completamente',
                data: usuario
            });
            
        } catch (error) {
            handleError(error, res);
        }
    }

    // UPDATE USER PARTIAL - PATCH /api/users/:id
    async updateUserPartial(req, res) {
        try {
            const { id } = req.params;
            const userData = req.body;
            
            if (Object.keys(userData).length === 0) {
                return handleError(
                    new Error('No se proporcionaron datos para actualizar'), 
                    res
                );
            }
            
            const usuario = await this.usersService.updateUserPartial(id, userData);
            
            res.json({
                success: true,
                message: 'Usuario actualizado parcialmente',
                data: usuario
            });
            
        } catch (error) {
            handleError(error, res);
        }
    }

    // CHANGE PASSWORD - PATCH /api/users/:id/password
    async changePassword(req, res) {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;
            
            const missingFields = validateInput(req, ['oldPassword', 'newPassword']);
            if (missingFields.length > 0) {
                return handleError(
                    new Error(`Faltan datos: ${missingFields.join(', ')} son obligatorios`), 
                    res
                );
            }
            
            const result = await this.usersService.changePassword(id, oldPassword, newPassword);
            
            res.json({
                success: true,
                message: 'Contraseña actualizada correctamente',
                data: result
            });
            
        } catch (error) {
            handleError(error, res);
        }
    }

    // DELETE USER - DELETE /api/users/:id
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            
            const usuario = await this.usersService.deleteUserById(id);
            
            res.json({
                success: true,
                message: 'Usuario eliminado correctamente',
                data: usuario
            });
            
        } catch (error) {
            handleError(error, res);
        }
    }
    
    // Método para obtener el router
    getRouter() {
        return this.router;
    }
}
