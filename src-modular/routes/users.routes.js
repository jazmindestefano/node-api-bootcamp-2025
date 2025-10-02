import express from "express";
import { 
    getAllUsersInfo,
    getUserBasicInfoById,
    updateUserComplete,
    updateUserPartial,
    deleteUserById,
    changePassword
} from "../service/users.service.js";
import { validateInput, handleError } from "../utils/validation.utils.js";

const router = express.Router();

// GET ALL USERS - GET /api/users
router.get('/', async (req, res) => {
    try {
        const usuarios = await getAllUsersInfo();

        res.json({
            success: true,
            message: 'Lista de usuarios',
            data: usuarios,
            count: usuarios.length
        });

    } catch (error) {
        handleError(error, res);
    }
});

// GET USER BY ID - GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await getUserBasicInfoById(id);

        res.json({
            success: true,
            message: 'Información del usuario',
            data: usuario
        });

    } catch (error) {
        handleError(error, res);
    }
});

// UPDATE USER COMPLETE - PUT /api/users/:id
router.put('/:id', async (req, res) => {
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
        
        const usuario = await updateUserComplete(id, { nombre, email, password });
        
        res.json({
            success: true,
            message: 'Usuario actualizado completamente',
            data: usuario
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

// UPDATE USER PARTIAL - PATCH /api/users/:id
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;
        
        if (Object.keys(userData).length === 0) {
            return handleError(
                new Error('No se proporcionaron datos para actualizar'), 
                res
            );
        }
        
        const usuario = await updateUserPartial(id, userData);
        
        res.json({
            success: true,
            message: 'Usuario actualizado parcialmente',
            data: usuario
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

// CHANGE PASSWORD - PATCH /api/users/:id/password
router.patch('/:id/password', async (req, res) => {
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
        
        const result = await changePassword(id, oldPassword, newPassword);
        
        res.json({
            success: true,
            message: 'Contraseña actualizada correctamente',
            data: result
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

// DELETE USER - DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const usuario = await deleteUserById(id);
        
        res.json({
            success: true,
            message: 'Usuario eliminado correctamente',
            data: usuario
        });
        
    } catch (error) {
        handleError(error, res);
    }
});

export default router;
