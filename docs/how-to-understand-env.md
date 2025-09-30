# Para qué sirve el archivo .env

El archivo `.env` es como un "diario secreto" donde guardas información sensible de tu aplicación que no quieres que otros vean.

## ¿Qué es?

### Archivo .env:
- **Guarda variables de entorno** (configuraciones importantes)
- **Es privado** - solo tú y tu aplicación lo ven
- **Se carga automáticamente** cuando inicias tu app
- **Formato simple**: `VARIABLE=valor`

### Ejemplo de archivo .env:
```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mi_app
DB_USER=admin
DB_PASSWORD=mi_password_secreto

# Servidor
PORT=3000
NODE_ENV=development

# APIs externas
API_KEY=abc123xyz789
JWT_SECRET=mi_secreto_super_seguro
```

## ¿Por qué usar .env?

### ✅ Ventajas:

#### 1. **Seguridad**:
- Las contraseñas no están en tu código
- Las claves de API están protegidas
- Si alguien ve tu código, no ve tus secretos

#### 2. **Flexibilidad**:
- Diferentes configuraciones para desarrollo y producción
- Cambias configuraciones sin tocar el código
- Cada desarrollador puede tener sus propias configuraciones

#### 3. **Organización**:
- Toda la configuración en un solo lugar
- Fácil de encontrar y modificar
- Separación clara entre código y configuración

### Ejemplo práctico:

#### ❌ SIN .env (peligroso):
```javascript
// index.js - MALO
const app = express();
app.listen(5432);  // ← Puerto hardcodeado

const dbPassword = "mi_password_secreto";  // ← Contraseña visible
```

#### ✅ CON .env (seguro):
```javascript
// index.js - BUENO
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.listen(process.env.PORT);  // ← Puerto desde .env

const dbPassword = process.env.DB_PASSWORD;  // ← Contraseña segura
```

## ¿Por qué NO subirlo a Git?

### ⚠️ Problemas de subirlo:

#### 1. **Seguridad**:
- Cualquiera con acceso al repositorio ve tus secretos
- Hackers pueden robar tus contraseñas
- Claves de API quedan expuestas

#### 2. **Conflictos**:
- Cada desarrollador tiene configuraciones diferentes
- Se sobrescriben las configuraciones constantemente
- Causa problemas en el equipo

#### 3. **Diferentes entornos**:
- Desarrollo, testing, producción tienen configuraciones distintas
- No puedes usar la misma configuración en todos lados

### Solución: .gitignore
```gitignore
# .gitignore
.env
.env.local
.env.production
.env.development
```

## Tipos de archivos .env:

### 1. **.env** (base):
```env
# Configuración por defecto
PORT=3000
NODE_ENV=development
DB_HOST=localhost
```

### 2. **.env.local** (local):
```env
# Solo para tu computadora
DB_PASSWORD=mi_password_local
API_KEY=mi_clave_local
```

### 3. **.env.development** (desarrollo):
```env
# Solo para desarrollo
NODE_ENV=development
DB_NAME=mi_app_dev
DEBUG=true
```

### 4. **.env.production** (producción):
```env
# Solo para producción
NODE_ENV=production
DB_NAME=mi_app_prod
DEBUG=false
```

### 5. **.env.example** (plantilla):
```env
# Plantilla para otros desarrolladores
PORT=3000
DB_HOST=localhost
DB_NAME=mi_app
DB_PASSWORD=tu_password_aqui
API_KEY=tu_api_key_aqui
```

## Cómo usar en tu código:

### 1. **Instalar dotenv**:
```bash
npm install dotenv
```

### 2. **Cargar en tu app**:
```javascript
import dotenv from "dotenv";
dotenv.config();  // ← Carga el archivo .env
```

### 3. **Usar las variables**:
```javascript
// Acceder a las variables
const port = process.env.PORT;
const dbPassword = process.env.DB_PASSWORD;
const apiKey = process.env.API_KEY;

console.log(`Servidor corriendo en puerto ${port}`);
```

## Mejores prácticas:

### ✅ SÍ hacer:
- Usar nombres descriptivos: `DB_PASSWORD` no `PASS`
- Documentar qué hace cada variable
- Crear un `.env.example` para el equipo
- Usar diferentes archivos para diferentes entornos

### ❌ NO hacer:
- Subir archivos `.env` a Git
- Poner contraseñas en el código
- Usar nombres confusos: `X`, `Y`, `Z`
- Olvidar el `.env.example`

## Ejemplo completo:

### .env.example (para el equipo):
```env
# Servidor
PORT=3000
NODE_ENV=development

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mi_app
DB_USER=admin
DB_PASSWORD=tu_password_aqui

# APIs
API_KEY=tu_api_key_aqui
JWT_SECRET=tu_jwt_secret_aqui
```

### .env (tu archivo real):
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mi_app
DB_USER=admin
DB_PASSWORD=mi_password_super_secreto
API_KEY=abc123xyz789
JWT_SECRET=mi_secreto_jwt
```

### En tu código:
```javascript
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
```

## Comandos útiles:

```bash
# Ver variables de entorno
echo $PORT

# Crear archivo .env
touch .env

# Ver contenido del .env
cat .env

# Verificar que esté en .gitignore
cat .gitignore | grep .env
```

