# Comparación: POO vs Modular

Este proyecto demuestra las diferencias entre **Programación Orientada a Objetos** y **Programación Modular** usando el mismo código de ejemplo.

## **Estructura del Proyecto**

```
node-api/
├── src-modular/          # Versión con Programación Modular
│   ├── models/          # Modelos de datos
│   ├── repository/      # Acceso a datos
│   ├── service/         # Lógica de negocio
│   ├── routes/          # Rutas de la API
│   ├── utils/           # Utilidades de validación
│   └── index.js         # Punto de entrada
├── src-oop/             # Versión con Programación Orientada a Objetos
│   ├── models/          # Clases de datos
│   ├── repository/      # Clases de acceso a datos
│   ├── service/         # Clases de lógica de negocio
│   ├── routes/          # Clases de rutas
│   ├── utils/           # Utilidades de validación
│   └── index.js         # Punto de entrada
├── package.json         # Configuración del proyecto
└── README.md           # Documentación del proyecto
```

## **Configuración Rápida**

### **1. Instalar dependencias**
```bash
npm install
```

### **2. Configurar puertos (opcional)**
```bash
# Para ejecutar ambas versiones simultáneamente
export PORT=3000        # Modular (por defecto)
export PORT_OOP=3001    # OOP (requerido)
```

## **Cómo Probar**

### **1. Probar versión Modular**
```bash
npm start
# o
npm run dev
```
**Servidor**: http://localhost:3000

### **2. Probar versión POO**
```bash
# Configurar puerto para OOP
export PORT_OOP=3001

# Ejecutar versión OOP
npm run start:oop
# o
npm run dev:oop
```
**Servidor**: http://localhost:3001

### **3. Scripts disponibles**
- `npm start` - Ejecuta versión modular
- `npm run start:oop` - Ejecuta versión OOP
- `npm run dev` - Desarrollo con nodemon (modular)
- `npm run dev:oop` - Desarrollo con nodemon (OOP)

## **Endpoints Disponibles**

### **Rutas principales**
- `GET /` - Información de la API y endpoints disponibles

### **Autenticación**
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/verify` - Verificar token (requiere Bearer token)

### **Gestión de usuarios**
- `GET /api/auth/user-basic-info/:id` - Obtener información básica de usuario por ID
- `GET /api/auth/all-users-info` - Obtener información de todos los usuarios
- `PUT /api/auth/users/:id` - Actualizar usuario completamente
- `PATCH /api/auth/users/:id` - Actualizar usuario parcialmente
- `DELETE /api/auth/users/:id` - Eliminar usuario

## **Ejemplo de Uso**

### **1. Registrar un usuario:**
```bash
# Versión Modular (puerto 3000)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "password": "123456"
  }'

# Versión OOP (puerto 3001)
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "password": "123456"
  }'
```

### **2. Iniciar sesión:**
```bash
# Versión Modular
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "123456"
  }'

# Versión OOP
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "123456"
  }'
```

### **3. Verificar token:**
```bash
# Versión Modular
curl -X GET http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer token_1_1234567890"

# Versión OOP
curl -X GET http://localhost:3001/api/auth/verify \
  -H "Authorization: Bearer token_1_1234567890"
```

### **4. Obtener información de usuario:**
```bash
# Versión Modular
curl -X GET http://localhost:3000/api/auth/user-basic-info/1

# Versión OOP
curl -X GET http://localhost:3001/api/auth/user-basic-info/1
```

### **5. Obtener todos los usuarios:**
```bash
# Versión Modular
curl -X GET http://localhost:3000/api/auth/all-users-info

# Versión OOP
curl -X GET http://localhost:3001/api/auth/all-users-info
```

### **6. Actualizar usuario completamente (PUT):**
```bash
# Versión Modular
curl -X PUT http://localhost:3000/api/auth/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez Actualizado",
    "email": "juan.actualizado@email.com",
    "password": "nueva123456"
  }'

# Versión OOP
curl -X PUT http://localhost:3001/api/auth/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez Actualizado",
    "email": "juan.actualizado@email.com",
    "password": "nueva123456"
  }'
```

### **7. Actualizar usuario parcialmente (PATCH):**
```bash
# Versión Modular
curl -X PATCH http://localhost:3000/api/auth/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos"
  }'

# Versión OOP
curl -X PATCH http://localhost:3001/api/auth/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos"
  }'
```

### **8. Eliminar usuario (DELETE):**
```bash
# Versión Modular
curl -X DELETE http://localhost:3000/api/auth/users/1

# Versión OOP
curl -X DELETE http://localhost:3001/api/auth/users/1
```

## **Tecnologías Utilizadas**

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para CORS
- **dotenv** - Manejo de variables de entorno
- **nodemon** - Herramienta de desarrollo

## **Comparación Directa**

### **Ejecutar ambas versiones simultáneamente:**
```bash
# Terminal 1 - Modular
export PORT=3000
npm run dev

# Terminal 2 - OOP  
export PORT_OOP=3001
npm run dev:oop
```

## **Configuración de Puertos**

### **Variables de Entorno**
- **Modular**: Usa `PORT` (por defecto 3000)
- **OOP**: Usa `PORT_OOP` (configurar manualmente)

### **Ejemplo de configuración:**
```bash
# Para ejecutar ambas versiones simultáneamente
export PORT=3000        # Modular
export PORT_OOP=3001    # OOP

# Ejecutar ambas
npm run dev &           # Modular en puerto 3000
npm run dev:oop         # OOP en puerto 3001
```