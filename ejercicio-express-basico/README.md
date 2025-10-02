# 🎓 Ejercicio Progresivo: Construyendo una API de Usuarios

## 📋 Objetivo
Construir paso a paso una API completa de gestión de usuarios, llegando a replicar la funcionalidad de `src-modular`.

## 🎯 Meta Final
Crear una API con los siguientes endpoints:
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión  
- `GET /api/auth/verify` - Verificar token
- `GET /api/auth/user-basic-info/:id` - Obtener usuario por ID
- `GET /api/auth/all-users-info` - Obtener todos los usuarios
- `PUT /api/auth/users/:id` - Actualizar usuario completamente
- `PATCH /api/auth/users/:id` - Actualizar usuario parcialmente
- `DELETE /api/auth/users/:id` - Eliminar usuario

## 📚 Fases del Ejercicio

### **Fase 1: Rutas Básicas** 🚀
- Crear servidor Express
- Implementar rutas GET básicas
- Manejar parámetros de URL

### **Fase 2: Servicios** ⚙️
- Extraer lógica de negocio
- Crear funciones de servicio
- Implementar validaciones

### **Fase 3: Repositorios** 🗄️
- Separar acceso a datos
- Crear funciones de repositorio
- Implementar CRUD completo

### **Fase 4: Integración** 🔗
- Conectar todas las capas
- Agregar middleware
- Implementar manejo de errores

## 🚀 Cómo Empezar

```bash
# 1. Instalar dependencias
npm install

# 2. Seguir las fases en orden
# 3. Completar cada fase antes de pasar a la siguiente
```

¡Vamos a construir una API profesional! 💪