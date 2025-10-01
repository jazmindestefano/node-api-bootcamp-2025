// VERSIÓN OOP - Programación Orientada a Objetos
// Aplicación principal usando clases y objetos

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AuthController } from "./routes/auth.routes.js";

dotenv.config();

// Clase principal de la aplicación
class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this._setupMiddleware();
        this._setupRoutes();
    }
    
    // Método privado para configurar middleware
    _setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    
    // Método privado para configurar rutas
    _setupRoutes() {
        // Ruta principal
        this.app.get('/', (req, res) => {
            res.json({
                message: 'API OOP funcionando',
                paradigm: 'Programación Orientada a Objetos',
                endpoints: {
                    register: 'POST /api/auth/register',
                    login: 'POST /api/auth/login',
                    verify: 'GET /api/auth/verify',
                    userBasicInfo: 'GET /api/auth/user-basic-info/:id',
                    allUsersInfo: 'GET /api/auth/all-users-info'
                }
            });
        });
        
        // Crear instancia del controlador de autenticación
        const authController = new AuthController();
        this.app.use('/api/auth', authController.getRouter());
    }
    
    // Método para iniciar el servidor
    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor OOP corriendo en puerto ${this.port}`);
            console.log(`Paradigma: Programación Orientada a Objetos`);
        });
    }
    
    // Método para obtener la aplicación Express
    getApp() {
        return this.app;
    }
    
    // Método para obtener el puerto
    getPort() {
        return this.port;
    }
}

// Crear instancia de la aplicación y iniciarla
const app = new App();
app.start();
