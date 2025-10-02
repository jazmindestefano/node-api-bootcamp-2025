# 📝 EJERCICIO 2: Refactorización a Service y Repository

## 🎯 Objetivo
Separar la lógica de negocio (**Service**) del acceso a datos (**Repository**), manteniendo las rutas limpias.

---

## 📂 Estructura de archivos

```plaintext
ejercicio-2/
├── package.json
├── .env
├── index.js
├── routes/
│   └── users.routes.js
├── service/
│   └── users.service.js
└── repository/
    └── users.repository.js
```

📝 Tu tarea

#### 1. Crear ```repository/users.repository.js```

Este archivo debe:

- Mantener el array de usuarios.

- Exportar funciones puras para manejar los datos:

```bash
getAllUsers()        // Devolver todos los usuarios
getUserById(id)      // Buscar por ID
createUser(userData) // Agregar al array
updateUser(id, userData) // Actualizar completo
patchUser(id, userData)  // Actualizar parcial
deleteUser(id)       // Eliminar del array
```

⚠️ Importante: Estas funciones solo manejan datos, NO validaciones de negocio.

#### 2. Crear ```service/users.service.js```

Este archivo debe:

- Importar funciones del repository.

Exportar funciones que:

- Llaman al repository.
- Manejan errores (ej: "Usuario no encontrado").
- Devuelven usuarios sin password.
- Funciones a exportar:

```bash
getAllUsersService()
getUserByIdService(id)
createUserService(userData)
updateUserCompleteService(id, userData)
updateUserPartialService(id, userData)
deleteUserService(id)
```