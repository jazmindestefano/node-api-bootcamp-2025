# 📝 EJERCICIO 3: Validaciones en Service y Model

## 🎯 Objetivo
Agregar un modelo de usuario con **validaciones robustas** y mover toda la lógica de validación al **Service**, dejando las rutas solo para recibir y enviar datos.

---

## 📂 Estructura de archivos

```plaintext
ejercicio-3/
├── package.json
├── .env
├── index.js
├── routes/
│   └── users.routes.js
├── service/
│   └── users.service.js
├── repository/
│   └── users.repository.js
├── models/
│   └── user.model.js
└── utils/
    └── validation.utils.js
```

📝 Tu tarea

#### 1. Crear ```models/user.model.js```

Este archivo debe contener:

a Configuración del modelo:

```bash
export const UserModel = {
    requiredFields: ['nombre', 'email', 'password'],
    patterns: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    minLengths: {
        nombre: 3,
        password: 6
    }
};
```

b. Función para crear usuario

c. Función para validar usuario

d. Función para traer user sin password

2. Crear ```utils/validation.utils.js```
Este archivo debe contener funciones auxiliares para validación:

```bash
// Validar que los campos requeridos estén presentes en el body
export const validateInput = (req, requiredFields) => {
    // implementación
};

// Manejar errores de forma consistente
export const handleError = (error, res) => {
    // implementación
};
```

3. Actualizar ```repository/users.repository.js```

Ahora debe usar las funciones del modelo.

4. Actualizar ```service/users.service.js```

Ahora debe incluir todas las validaciones antes de llamar al repository.

5. Actualizar ```routes/users.routes.js```

Las rutas ahora solo:

- Validan campos vacíos.

- Delegan todo al service.

6. Actualizar ```index.js```

Debe mantener la configuración de Express simple e importar las rutas.