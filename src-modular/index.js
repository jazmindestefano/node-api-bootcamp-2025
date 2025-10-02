// VERSIÓN MODULAR - Programación Funcional
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();

const createApp = () => {
    const app = express();
    
    app.use(cors());
    app.use(express.json());
    
    return app;
};

const setupRoutes = (app) => {
    // Ruta principal
    app.get('/', (req, res) => {
        res.json({
            message: 'API Modular funcionando',
            paradigm: 'Programación Funcional/Modular',
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
    
    // Rutas separadas
    app.use('/api/auth', authRoutes);
    app.use('/api/users', usersRoutes);
    
    return app;
};

const startServer = (app) => {
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => {
        console.log(`🚀 Servidor Modular corriendo en puerto ${port}`);
        console.log(`📚 Paradigma: Programación Funcional/Modular`);
        console.log(`🔗 Documentación: http://localhost:${port}/`);
    });
};

const app = createApp();
const appWithRoutes = setupRoutes(app);
startServer(appWithRoutes);
