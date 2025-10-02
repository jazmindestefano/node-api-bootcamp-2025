// VERSIÓN MODULAR - Programación Funcional
// Aplicación principal usando funciones puras

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

// Función pura para crear la aplicación
const createApp = () => {
    const app = express();
    
    // Middleware
    app.use(cors());
    app.use(express.json());
    
    return app;
};

// Función pura para configurar rutas
const setupRoutes = (app) => {
    // Ruta principal
    app.get('/', (req, res) => {
        res.json({
            message: 'API Modular funcionando',
            paradigm: 'Programación Funcional/Modular',
            endpoints: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login',
                userBasicInfo: 'GET /api/auth/user-basic-info/:id',
                allUsersInfo: 'GET /api/auth/all-users-info',
                updateUserComplete: 'PUT /api/auth/users/:id',
                updateUserPartial: 'PATCH /api/auth/users/:id',
                deleteUser: 'DELETE /api/auth/users/:id'
            }
        });
    });
    
    // Rutas de autenticación
    app.use('/api/auth', authRoutes);
    
    return app;
};

// Función pura para iniciar servidor
const startServer = (app) => {
    const port = process.env.PORT;
    
    app.listen(port, () => {
        console.log(`Servidor Modular corriendo en puerto ${port}`);
        console.log(`Paradigma: Programación Funcional/Modular`);
    });
};

// Composición de funciones (estilo funcional)
const app = createApp();
const appWithRoutes = setupRoutes(app);
startServer(appWithRoutes);
