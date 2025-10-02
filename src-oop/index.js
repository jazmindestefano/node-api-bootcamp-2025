// VERSIÓN OOP - Programación Orientada a Objetos
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AuthController } from "./routes/auth.routes.js";
import { UsersController } from "./routes/users.routes.js";

dotenv.config();

// Clase principal de la aplicación
class App {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
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
                version: '2.0',
                endpoints: {
                    auth: {
                        register: 'POST /api/auth/register',
                        login: 'POST /api/auth/login'
                    },
                    users: {
                        getAll: 'GET /api/users',
                        getById: 'GET /api/users/:id',
                        update: 'PUT /api/users/:id',
                        partialUpdate: 'PATCH /api/users/:id',
                        delete: 'DELETE /api/users/:id',
                        changePassword: 'PATCH /api/users/:id/password'
                    }
                }
            });
        });
        
        // Crear instancias de los controladores
        const authController = new AuthController();
        const usersController = new UsersController();
        
        // Configurar rutas
        this.app.use('/api/auth', authController.getRouter());
        this.app.use('/api/users', usersController.getRouter());
    }
    
    // Método para iniciar el servidor
    start() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor OOP corriendo en puerto ${this.port}`);
            console.log(`📚 Paradigma: Programación Orientada a Objetos`);
            console.log(`🔗 Documentación: http://localhost:${this.port}/`);
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
