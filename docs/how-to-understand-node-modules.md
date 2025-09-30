# Para qué sirve node_modules

La carpeta `node_modules` es donde Node.js guarda todas las librerías que tu proyecto necesita para funcionar.

## ¿Por qué existe?

### El problema:
- Tu proyecto necesita librerías como `express`, `dotenv`, `nodemon`
- Estas librerías están en internet, no en tu computadora
- Cada librería puede necesitar OTRAS librerías para funcionar
- Es un lío descargar todo manualmente

### La solución:
- `node_modules` = Una carpeta gigante con TODAS las librerías
- Node.js la crea automáticamente cuando haces `npm install`
- Aquí están todas las librerías que necesitas

## ¿Cómo funciona?

### 1. Cuando instalas una librería:
```bash
npm install express
```

### 2. Node.js hace esto:
1. Descarga `express` de internet
2. La guarda en `node_modules/express/`
3. Descarga las librerías que `express` necesita
4. Las guarda en `node_modules/` también
5. Actualiza el `package.json`

### 3. Resultado:
```
tu-proyecto/
├── node_modules/          ← Aquí están TODAS las librerías
│   ├── express/           ← La librería que instalaste
│   ├── dotenv/            ← Otra librería
│   ├── nodemon/           ← Otra librería
│   └── ... (muchas más)   ← Y todas las que necesitan
├── package.json           ← Lista de lo que necesitas
└── index.js               ← Tu código
```

## ¿Qué hay dentro de node_modules?

### Librerías principales:
- `express/` - Para crear servidores web
- `dotenv/` - Para variables de entorno
- `nodemon/` - Para reiniciar el servidor

### Librerías que necesitan las principales:
- `express` necesita `body-parser`, `cookie-parser`, etc.
- `dotenv` necesita `fs`, `path`, etc.
- Cada una trae sus propias dependencias

### Resultado:
- **Tu instalas**: 3 librerías
- **node_modules tiene**: 50+ librerías (porque cada una trae sus dependencias)

## Reglas importantes:

### ✅ SÍ puedes hacer:
- Ver qué hay dentro
- Leer el código de las librerías
- Usar las librerías en tu código

### ❌ NO hagas esto:
- **NUNCA edites** archivos dentro de `node_modules`
- **NUNCA borres** carpetas de `node_modules`
- **NUNCA subas** `node_modules` a Git

## ¿Por qué no subir node_modules a Git?

### Problemas:
- Es MUY pesada (cientos de MB)
- Se puede recrear con `npm install`
- Cada computadora puede tener versiones diferentes
- Hace que Git sea lento

### Solución:
- Git ignora `node_modules` (con `.gitignore`)
- Cada desarrollador hace `npm install` en su computadora
- Node.js recrea la carpeta automáticamente

## Comandos útiles:

```bash
# Ver qué hay en node_modules
ls node_modules

# Ver el tamaño de node_modules
du -sh node_modules

# Borrar node_modules (si algo se rompe)
rm -rf node_modules
npm install

# Ver qué librerías están instaladas
npm list
```

## Resumen simple:

- **node_modules** = Carpeta con todas las librerías
- **Se crea sola** cuando haces `npm install`
- **No la toques** - déjala que Node.js la maneje
- **No la subas** a Git - es muy pesada
- **Se puede recrear** en cualquier momento con `npm install`

## Analogía:
`node_modules` es como una biblioteca gigante donde Node.js guarda todos los libros (librerías) que tu proyecto necesita para funcionar. Tú solo pides los libros que necesitas, y Node.js se encarga de traerlos y organizarlos.
