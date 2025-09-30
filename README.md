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
│   └── index.js         # Punto de entrada
├── src-oop/             # Versión con Programación Orientada a Objetos
│   ├── models/          # Clases de datos
│   ├── repository/      # Clases de acceso a datos
│   ├── service/         # Clases de lógica de negocio
│   ├── routes/          # Clases de rutas
│   └── index.js         # Punto de entrada
└── docs/                # Documentación
    └── comparison-poo-vs-modular.md
```

## **Cómo Probar**

### **1. Instalar dependencias**
```bash
npm install
```

### **2. Probar versión Modular**
```bash
cd src-modular
node index.js
```
**Servidor**: http://localhost:3000

### **3. Probar versión POO**
```bash
cd src-oop
node index.js
```
**Servidor**: http://localhost:3000

## **Endpoints Disponibles**

- `GET /` - Información de la API
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión
- `GET /auth/verify` - Verificar token

## **Ejemplo de Uso**

### **Registrar un usuario:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@email.com",
    "password": "123456"
  }'
```

### **Iniciar sesión:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@email.com",
    "password": "123456"
  }'
```

## **Documentación**

Lee el archivo `docs/comparison-poo-vs-modular.md` para entender las diferencias entre ambos estilos de programación.

## **Características**

- ✅ **Misma funcionalidad** en ambos estilos
- ✅ **Código limpio** y bien comentado
- ✅ **Estructura clara** y organizada
- ✅ **Fácil de entender** para principiantes
- ✅ **Ejemplos prácticos** de cada estilo