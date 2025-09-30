# Comparación: POO vs Modular

Este documento compara **Programación Orientada a Objetos** y **Programación Modular** usando el mismo código de ejemplo.

## **¿Qué son estos estilos?**

### **Programación Modular**:
- Organizar el código en **funciones independientes**
- Cada función hace **una cosa específica**
- Fácil de entender y mantener
- Ideal para proyectos pequeños/medianos

### **Programación Orientada a Objetos (POO)**:
- Organizar el código en **clases y objetos**
- Los objetos tienen **datos** (propiedades) y **comportamientos** (métodos)
- Mejor para proyectos grandes y complejos
- Permite reutilización y organización

---

## **1. CREACIÓN DE USUARIOS**

### **Modular**:
```javascript
// Función simple que crea un objeto
export function createUser(userData) {
    return {
        id: userData.id || Date.now(),
        nombre: userData.nombre,
        email: userData.email,
        password: userData.password,
        createdAt: userData.createdAt || new Date().toISOString()
    };
}

// Uso
const user = createUser({ nombre: "Juan", email: "juan@email.com" });
```

### **POO**:
```javascript
// Clase que define la estructura del usuario
export class User {
    constructor(userData) {
        this.id = userData.id || Date.now();
        this.nombre = userData.nombre;
        this.email = userData.email;
        this.password = userData.password;
        this.createdAt = userData.createdAt || new Date().toISOString();
    }
}

// Uso
const user = new User({ nombre: "Juan", email: "juan@email.com" });
```

---

## **2. VALIDACIÓN DE DATOS**

### **Modular**:
```javascript
// Funciones independientes para validar
export function validateName(nombre) {
    return nombre && nombre.trim().length > 0;
}

export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
    return password && password.length >= 6;
}

// Función que usa las otras funciones
export function validateUser(user) {
    const errors = [];
    if (!validateName(user.nombre)) errors.push('El nombre es obligatorio');
    if (!validateEmail(user.email)) errors.push('Email inválido');
    if (!validatePassword(user.password)) errors.push('Contraseña inválida');
    return errors;
}

// Uso
const errors = validateUser(userData);
```

### **POO**:
```javascript
// Métodos dentro de la clase User
export class User {
    constructor(userData) {
        this.id = userData.id || Date.now();
        this.nombre = userData.nombre;
        this.email = userData.email;
        this.password = userData.password;
        this.createdAt = userData.createdAt || new Date().toISOString();
    }

    // Método para validar el usuario
    validate() {
        const errors = [];
        if (!this.validateName()) errors.push('El nombre es obligatorio');
        if (!this.validateEmail()) errors.push('Email inválido');
        if (!this.validatePassword()) errors.push('Contraseña inválida');
        return errors;
    }

    // Métodos privados de validación
    validateName() {
        return this.nombre && this.nombre.trim().length > 0;
    }

    validateEmail() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    }

    validatePassword() {
        return this.password && this.password.length >= 6;
    }
}

// Uso
const user = new User(userData);
const errors = user.validate();
```

---

## **3. MANEJO DE DATOS (Repository)**

### **Modular**:
```javascript
// Array global para almacenar usuarios
let usuarios = [];

// Funciones para manejar los datos
export function getAllUsers() {
    return usuarios.map(user => ({
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        createdAt: user.createdAt
    }));
}

export function createUser(userData) {
    const nuevoUsuario = createUser(userData);
    usuarios.push(nuevoUsuario);
    return {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        createdAt: nuevoUsuario.createdAt
    };
}

export function getUserByEmail(email) {
    return usuarios.find(user => user.email === email);
}
```

### **POO**:
```javascript
// Clase que maneja los datos de usuarios
export class UserRepository {
    constructor() {
        this.usuarios = [];
    }

    // Método para obtener todos los usuarios
    getAllUsers() {
        return this.usuarios.map(user => user.toSafeObject());
    }

    // Método para crear un usuario
    createUser(userData) {
        const nuevoUsuario = new User(userData);
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario.toSafeObject();
    }

    // Método para buscar por email
    getUserByEmail(email) {
        return this.usuarios.find(user => user.email === email);
    }
}
```

---

## **4. CONTROLADORES (Routes)**

### **Modular**:
```javascript
import express from 'express';
import { createUser, validateUser } from '../service/auth.service.js';

const router = express.Router();

// Función para manejar el registro
export async function registerUser(req, res) {
    try {
        const errors = validateUser(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const usuario = await createUser(req.body);
        res.status(201).json({ 
            message: 'Usuario registrado', 
            usuario 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Configurar la ruta
router.post('/register', registerUser);
export default router;
```

### **POO**:
```javascript
import express from 'express';
import { AuthService } from '../service/auth.service.js';

// Clase que maneja las rutas de autenticación
export class AuthController {
    constructor() {
        this.authService = new AuthService();
        this.router = express.Router();
        this.setupRoutes();
    }

    // Método para configurar las rutas
    setupRoutes() {
        this.router.post('/register', this.registerUser.bind(this));
    }

    // Método para manejar el registro
    async registerUser(req, res) {
        try {
            const usuario = await this.authService.registerUser(req.body);
            res.status(201).json({ 
                message: 'Usuario registrado', 
                usuario 
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
```

---

## **TABLA COMPARATIVA**

| Aspecto | Modular | POO |
|---------|---------|-----|
| **Sintaxis** | `function` tradicional | `class` y `new` |
| **Organización** | Funciones sueltas | Clases con métodos |
| **Reutilización** | Funciones independientes | Herencia y polimorfismo |
| **Testing** | Muy fácil | Moderado |
| **Complejidad** | Baja | Alta |
| **Curva de aprendizaje** | Baja | Alta |
| **Mantenimiento** | Fácil en proyectos pequeños | Mejor en proyectos grandes |

---

## **VENTAJAS Y DESVENTAJAS**

### **Modular**:

#### ✅ **Ventajas**:
- **Súper simple** - fácil de entender
- **Fácil de testear** - funciones independientes
- **Rápido de escribir** - menos código
- **Flexible** - puedes usar las funciones como quieras
- **Ideal para principiantes**

#### ❌ **Desventajas**:
- **Difícil de organizar** en proyectos grandes
- **Puede volverse caótico** con muchas funciones
- **Menos reutilización** - duplicación de código
- **No modela bien** entidades del mundo real

### **POO**:

#### ✅ **Ventajas**:
- **Organización clara** - todo está en su lugar
- **Reutilización** - herencia y polimorfismo
- **Modela bien** entidades del mundo real
- **Escalable** - crece bien con el proyecto
- **Encapsulación** - datos y métodos juntos

#### ❌ **Desventajas**:
- **Más complejo** - clases, herencia, etc.
- **Curva de aprendizaje alta**
- **Puede ser verboso** - mucho código
- **Difícil de testear** - dependencias entre objetos

---

## **CUÁNDO USAR CADA UNO**

### **Usa Modular cuando**:
- ✅ **Proyecto pequeño/mediano**
- ✅ **Eres principiante** en programación
- ✅ **Necesitas simplicidad** y claridad
- ✅ **Prototipos rápidos**
- ✅ **Scripts simples** y utilidades

### **Usa POO cuando**:
- ✅ **Proyecto grande/complejo**
- ✅ **Modelas entidades del mundo real**
- ✅ **Necesitas organización clara** y estructura
- ✅ **Tienes experiencia**
- ✅ **Aplicaciones empresariales** complejas

---

## **EJEMPLO PRÁCTICO: MISMA FUNCIONALIDAD**

### **Crear y validar un usuario:**

#### **Modular**:
```javascript
const user = createUser({ nombre: "Juan", email: "juan@email.com" });
const errors = validateUser(user);
```

#### **POO**:
```javascript
const user = new User({ nombre: "Juan", email: "juan@email.com" });
const errors = user.validate();
```

---

## **CÓMO PROBAR CADA VERSIÓN**

### **Versión Modular**:
```bash
cd src-modular
node index.js
# Servidor en puerto 3000 - Estilo Modular
```

### **Versión POO**:
```bash
cd src-oop
node index.js
# Servidor en puerto 3000 - Estilo POO
```

---

## **RECOMENDACIONES**

### **Para principiantes**:
1. **Modular** - Empieza aquí
2. **POO** - Cuando tengas más experiencia

### **Para proyectos**:
- **Startups/MVPs**: Modular
- **Empresas grandes**: POO

### **Para equipos**:
- **Equipos nuevos**: Modular
- **Equipos experimentados**: POO

---

## **CONCLUSIÓN**

Los **dos estilos** son **válidos** y **útiles**. La elección depende de:

1. **Tamaño del proyecto**
2. **Experiencia del equipo**
3. **Complejidad del dominio**
4. **Preferencias personales**

**Lo importante** es ser **consistente** en todo el proyecto y elegir el estilo que mejor se adapte a tus necesidades específicas.
