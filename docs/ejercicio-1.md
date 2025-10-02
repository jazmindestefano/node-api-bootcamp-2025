# EJERCICIO 1: Rutas básicas con validaciones

## 🎯 Objetivo
Crear un servidor **Express** con rutas CRUD básicas para usuarios, manejando todas las operaciones directamente en las rutas con validaciones de datos vacíos.

---

## 📌 Requisitos
- Tener **Node.js** instalado.  
- Crear un proyecto con:

```bash
npm init -y
```

- Instalar dependencias:

```bash
npm install express cors dotenv
```

- Agregar ```"type": "module"``` en ```package.json```

📂 Estructura de archivos

```bash
ejercicio-1/
├── package.json
├── .env
└── index.js
```

Archivo .env

```bash
PORT=3000
```

📝 Tu tarea

Crear el archivo index.js que debe:

1. Configurar Express con middleware JSON y CORS.

2. Crear un array de usuarios en memoria (vacío al inicio).

3. Implementar las siguientes rutas:

Rutas

```GET /api/users```
```bash
{ "success": true, "data": [...], "count": N }
```

```GET /api/users/:id```
- Devuelve un usuario específico por ID.
- Si no existe, devolver error 404.

```POST /api/users```

- Crea un nuevo usuario.
- Validar que nombre, email y password NO estén vacíos.
- Generar un ID único con Date.now().
- Agregar createdAt con la fecha actual.
- Devolver el usuario creado (sin password).

```PUT /api/users/:id```
- Actualiza TODOS los datos de un usuario.
- Validar que nombre, email y password NO estén vacíos.
- Si el usuario no existe, devolver error 404.
- Devolver el usuario actualizado (sin password).

```PATCH /api/users/:id```
- Actualiza ALGUNOS datos de un usuario.
- Validar que se envíe al menos un campo.
- Si el usuario no existe, devolver error 404.
- Devolver el usuario actualizado (sin password).

```DELETE /api/users/:id```

✅ Validaciones requeridas
```bash
// Ejemplo de validación para POST
if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ 
        success: false, 
        message: 'El nombre es obligatorio' 
    });
}
```

🧩 Estructura de un usuario
```bash
{
    id: 1234567890,
    nombre: "Juan Pérez",
    email: "juan@example.com",
    password: "123456",
    createdAt: "2025-01-15T10:30:00.000Z"
}
```

⚠️ Importante

- NO incluir password en las respuestas (usar destructuring para eliminarlo).
- Todas las respuestas deben tener formato consistente.
- Manejar errores con try-catch.
- Usar parseInt() para convertir el ID de los params.

🧪 Cómo probar

```bash
# Iniciar servidor
node index.js

# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan","email":"juan@test.com","password":"123456"}'

# Ver todos
curl http://localhost:3000/api/users

# Ver uno
curl http://localhost:3000/api/users/1234567890

# Actualizar completo
curl -X PUT http://localhost:3000/api/users/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Updated","email":"juan2@test.com","password":"newpass"}'

# Actualizar parcial
curl -X PATCH http://localhost:3000/api/users/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Solo nombre"}'

# Eliminar
curl -X DELETE http://localhost:3000/api/users/1234567890
```