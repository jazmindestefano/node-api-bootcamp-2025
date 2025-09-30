# Para qué sirve HTTP

HTTP (HyperText Transfer Protocol) es como el "idioma" que usan los navegadores y servidores para comunicarse en internet.

## ¿Qué es?

### HTTP:
- **Protocolo de comunicación** entre cliente y servidor
- **Define reglas** para enviar y recibir datos
- **Es la base** de toda la web
- **Funciona con peticiones y respuestas**

### Analogía simple:
HTTP es como el "idioma del correo" entre tu navegador (cliente) y los sitios web (servidor).

## Estructura de una petición HTTP:

### 1. **Línea de petición**:
```
GET /api/usuarios HTTP/1.1
```
- **Método**: GET (qué quieres hacer)
- **Ruta**: /api/usuarios (dónde quieres ir)
- **Versión**: HTTP/1.1 (qué versión del protocolo)

### 2. **Headers (encabezados)**:
```
Host: mi-api.com
Accept: application/json
Content-Type: application/json
Authorization: Bearer abc123
```
- **Información adicional** sobre la petición
- **Configuración** de cómo enviar/recibir datos

### 3. **Body (cuerpo)**:
```json
{
  "nombre": "Juan",
  "email": "juan@email.com"
}
```
- **Datos** que envías al servidor
- **Solo en algunos métodos** (POST, PUT, PATCH)

## Estructura de una respuesta HTTP:

### 1. **Línea de estado**:
```
HTTP/1.1 200 OK
```
- **Versión**: HTTP/1.1
- **Código**: 200 (estado de la respuesta)
- **Mensaje**: OK (descripción del estado)

### 2. **Headers de respuesta**:
```
Content-Type: application/json
Content-Length: 156
Access-Control-Allow-Origin: *
```
- **Información** sobre la respuesta
- **Configuración** de cómo interpretar los datos

### 3. **Body de respuesta**:
```json
{
  "usuarios": [
    {"id": 1, "nombre": "Juan"},
    {"id": 2, "nombre": "María"}
  ]
}
```
- **Datos** que devuelve el servidor

## Métodos HTTP principales:

### 1. **GET** - Obtener datos:
```http
GET /api/usuarios HTTP/1.1
Host: mi-api.com
```
- **Para qué**: Obtener información
- **Ejemplo**: Ver lista de usuarios, ver un producto
- **Body**: No tiene (los datos van en la URL)
- **Idempotente**: Sí (hacerlo varias veces da el mismo resultado)

### 2. **POST** - Crear datos:
```http
POST /api/usuarios HTTP/1.1
Host: mi-api.com
Content-Type: application/json

{
  "nombre": "Juan",
  "email": "juan@email.com"
}
```
- **Para qué**: Crear algo nuevo
- **Ejemplo**: Crear usuario, enviar formulario
- **Body**: Sí (los datos a crear)
- **Idempotente**: No (crear varias veces crea varios registros)

### 3. **PUT** - Actualizar completamente:
```http
PUT /api/usuarios/1 HTTP/1.1
Host: mi-api.com
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan.perez@email.com"
}
```
- **Para qué**: Reemplazar completamente un recurso
- **Ejemplo**: Actualizar perfil de usuario
- **Body**: Sí (todos los datos nuevos)
- **Idempotente**: Sí

### 4. **PATCH** - Actualizar parcialmente:
```http
PATCH /api/usuarios/1 HTTP/1.1
Host: mi-api.com
Content-Type: application/json

{
  "email": "nuevo@email.com"
}
```
- **Para qué**: Actualizar solo algunos campos
- **Ejemplo**: Cambiar solo el email
- **Body**: Sí (solo los campos a cambiar)
- **Idempotente**: Sí

### 5. **DELETE** - Eliminar:
```http
DELETE /api/usuarios/1 HTTP/1.1
Host: mi-api.com
```
- **Para qué**: Eliminar un recurso
- **Ejemplo**: Borrar usuario, eliminar producto
- **Body**: No (el ID va en la URL)
- **Idempotente**: Sí

## Códigos de estado HTTP:

### 2xx - Éxito:
- **200 OK**: Todo salió bien
- **201 Created**: Se creó algo nuevo
- **204 No Content**: Éxito pero sin datos

### 3xx - Redirección:
- **301 Moved Permanently**: La página se movió
- **302 Found**: Redirección temporal

### 4xx - Error del cliente:
- **400 Bad Request**: Petición mal formada
- **401 Unauthorized**: No autorizado
- **403 Forbidden**: Prohibido
- **404 Not Found**: No encontrado
- **422 Unprocessable Entity**: Datos inválidos

### 5xx - Error del servidor:
- **500 Internal Server Error**: Error interno
- **502 Bad Gateway**: Error de servidor
- **503 Service Unavailable**: Servicio no disponible

## Headers importantes:

### 1. **Content-Type** - ¿Qué formato tienen los datos?

#### ¿Por qué es importante?
- **Le dice al servidor** cómo interpretar los datos que envías
- **Evita errores** de interpretación
- **El servidor sabe** si debe procesar como JSON, texto, imagen, etc.

#### Ejemplos y cuándo usarlos:

```http
# JSON - Para APIs y datos estructurados
Content-Type: application/json
{
  "nombre": "Juan",
  "email": "juan@email.com"
}

# Formulario web - Para datos de formularios HTML
Content-Type: application/x-www-form-urlencoded
nombre=Juan&email=juan@email.com

# Texto plano - Para mensajes simples
Content-Type: text/plain
Hola, este es un mensaje

# HTML - Para páginas web
Content-Type: text/html
<html><body><h1>Mi página</h1></body></html>

# Imagen - Para archivos de imagen
Content-Type: image/jpeg
[binary data de la imagen]
```

#### ¿Qué pasa si no lo pones?
```javascript
// Sin Content-Type, el servidor no sabe cómo interpretar los datos
app.post('/api/usuarios', (req, res) => {
  console.log(req.body); // ← Puede ser undefined o un string
});

// Con Content-Type, el servidor sabe que es JSON
app.post('/api/usuarios', (req, res) => {
  console.log(req.body); // ← Es un objeto JavaScript
});
```

### 2. **Authorization** - ¿Quién eres y qué permisos tienes?

#### ¿Por qué es importante?
- **Identifica al usuario** que hace la petición
- **Controla el acceso** a recursos protegidos
- **Evita que cualquiera** acceda a datos privados

#### Tipos de autorización:

##### **Bearer Token** (más común en APIs):
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

**¿Por qué Bearer?**
- **Token JWT** (JSON Web Token) que contiene información del usuario
- **Se genera** cuando el usuario se loguea
- **Se incluye** en cada petición para identificarse
- **El servidor verifica** si el token es válido

**Ejemplo de flujo:**
```javascript
// 1. Usuario se loguea
POST /api/login
{
  "email": "juan@email.com",
  "password": "mi_password"
}

// 2. Servidor responde con token
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}

// 3. Usuario usa el token en peticiones
GET /api/usuarios
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

##### **Basic Auth** (usuario y contraseña):
```http
Authorization: Basic dXNlcjpwYXNz
```

**¿Qué es?**
- **dXNlcjpwYXNz** = "user:pass" codificado en Base64
- **Menos seguro** que Bearer (se envía en cada petición)
- **Más simple** de implementar

**Ejemplo:**
```javascript
// Usuario: "admin", Password: "123456"
// Se codifica como: "admin:123456" → "YWRtaW46MTIzNDU2"
Authorization: Basic YWRtaW46MTIzNDU2
```

### 3. **Accept** - ¿Qué formato quieres recibir?

#### ¿Por qué es importante?
- **Le dice al servidor** qué formato prefieres para la respuesta
- **El servidor puede** enviar los datos en el formato que quieres
- **Mejora la experiencia** del usuario

#### Ejemplos:

```http
# Quiero datos en JSON (para aplicaciones)
Accept: application/json

# Quiero una página web (para navegadores)
Accept: text/html

# Quiero datos en XML (para sistemas legacy)
Accept: application/xml

# Acepto varios formatos (el servidor elige)
Accept: application/json, text/html, */*
```

#### ¿Cómo lo usa el servidor?
```javascript
app.get('/api/usuarios', (req, res) => {
  const usuarios = [{ id: 1, nombre: 'Juan' }];
  
  // El servidor verifica qué formato quiere el cliente
  const acceptHeader = req.headers.accept;
  
  if (acceptHeader.includes('application/json')) {
    res.json(usuarios);  // Envía JSON
  } else if (acceptHeader.includes('text/html')) {
    res.send(`<ul>${usuarios.map(u => `<li>${u.nombre}</li>`).join('')}</ul>`);
  } else {
    res.json(usuarios);  // Por defecto JSON
  }
});
```

### 4. **Otros headers importantes:**

#### **User-Agent** - ¿Qué aplicación está haciendo la petición?
```http
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```
- **Identifica** el navegador, app móvil, o herramienta
- **Útil para** estadísticas y debugging
- **Algunos servidores** bloquean ciertos User-Agents

#### **Content-Length** - ¿Cuántos bytes tiene el body?
```http
Content-Length: 156
```
- **Le dice al servidor** cuántos datos va a recibir
- **Evita** problemas de lectura de datos
- **Se calcula automáticamente** en la mayoría de casos

#### **Cache-Control** - ¿Cómo manejar el caché?
```http
Cache-Control: no-cache        # No usar caché
Cache-Control: max-age=3600    # Cachear por 1 hora
```
- **Controla** si la respuesta se puede guardar en caché
- **Mejora** el rendimiento
- **Evita** datos desactualizados

## Ejemplo completo con headers:

### Petición:
```http
POST /api/usuarios HTTP/1.1
Host: localhost:3000
Content-Type: application/json          # ← "Voy a enviar datos en JSON"
Accept: application/json                # ← "Quiero la respuesta en JSON"
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9  # ← "Soy el usuario con este token"
User-Agent: MiApp/1.0                  # ← "Soy la aplicación MiApp"
Content-Length: 89                      # ← "El body tiene 89 bytes"

{
  "nombre": "Ana García",
  "email": "ana@email.com"
}
```

### Respuesta:
```http
HTTP/1.1 201 Created
Content-Type: application/json          # ← "Te envío datos en JSON"
Content-Length: 120                     # ← "La respuesta tiene 120 bytes"
Cache-Control: no-cache                 # ← "No guardes esto en caché"
Location: /api/usuarios/3               # ← "El nuevo recurso está aquí"

{
  "id": 3,
  "nombre": "Ana García",
  "email": "ana@email.com",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## ¿Por qué son tan importantes los headers?

### 1. **Comunicación clara**:
- Cliente y servidor se entienden mejor
- Menos errores de interpretación
- Mejor experiencia de usuario

### 2. **Seguridad**:
- Authorization controla el acceso
- Content-Type previene ataques
- Headers de seguridad protegen la aplicación

### 3. **Rendimiento**:
- Accept permite respuestas optimizadas
- Cache-Control mejora la velocidad
- Content-Length evita problemas de red

### 4. **Debugging**:
- User-Agent ayuda a identificar problemas
- Headers personalizados para logging
- Mejor trazabilidad de peticiones

## Ejemplo completo:

### Petición:
```http
POST /api/usuarios HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

{
  "nombre": "Ana García",
  "email": "ana@email.com",
  "edad": 25
}
```

### Respuesta:
```http
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 89
Location: /api/usuarios/3

{
  "id": 3,
  "nombre": "Ana García",
  "email": "ana@email.com",
  "edad": 25,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## En tu proyecto Node.js:

### Configurar rutas:
```javascript
import express from "express";
const app = express();

// GET - Obtener usuarios
app.get('/api/usuarios', (req, res) => {
  res.json({ usuarios: ['Juan', 'María'] });
});

// POST - Crear usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  res.status(201).json({ id: 1, nombre, email });
});

// PUT - Actualizar usuario
app.put('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  res.json({ id, nombre, email });
});

// DELETE - Eliminar usuario
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  res.status(204).send();
});
```

## Herramientas para probar HTTP:

### 1. **Navegador** (solo GET):
```
http://localhost:3000/api/usuarios
```

### 2. **curl** (terminal):
```bash
# GET
curl http://localhost:3000/api/usuarios

# POST
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Juan", "email": "juan@email.com"}'
```

### 3. **Postman** (aplicación):
- Interfaz gráfica para probar APIs
- Guarda peticiones
- Organiza por proyectos

## Mejores prácticas:

### ✅ SÍ hacer:
- Usar métodos correctos para cada acción
- Enviar códigos de estado apropiados
- Incluir headers necesarios
- Validar datos antes de procesar

### ❌ NO hacer:
- Usar GET para crear datos
- Usar POST para obtener datos
- Ignorar códigos de error
- Enviar datos sensibles en la URL

## Resumen simple:

- **HTTP** = Idioma de comunicación web
- **Petición** = Lo que envía el cliente
- **Respuesta** = Lo que devuelve el servidor
- **Métodos** = GET (obtener), POST (crear), PUT (actualizar), DELETE (eliminar)
- **Códigos** = 200 (éxito), 404 (no encontrado), 500 (error servidor)
- **Headers** = Información adicional sobre la petición/respuesta

## Analogía:
HTTP es como el "idioma del correo" entre tu navegador y los sitios web. Tú escribes una carta (petición) con una dirección (URL) y un tipo de envío (método), y el servidor te responde con otra carta (respuesta) que incluye el resultado y el estado de tu solicitud.
