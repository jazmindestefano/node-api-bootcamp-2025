# Para qué sirve cada cosa en package.json

El `package.json` es como la "cédula de identidad" de tu proyecto Node.js. Te dice qué es, qué necesita para funcionar y cómo ejecutarlo.

## Tu package.json actual explicado:

```json
{
  "name": "api",                    // ← El nombre de tu proyecto
  "version": "1.0.0",              // ← Qué versión es (1.0.0 = primera versión)
  "main": "index.js",              // ← El archivo principal que se ejecuta
  "scripts": {                     // ← Comandos que puedes ejecutar
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],                  // ← Palabras para encontrar tu proyecto
  "author": "",                    // ← Quién lo hizo
  "license": "ISC",                // ← Qué tan libre es tu código
  "description": "",               // ← Qué hace tu proyecto
  "dependencies": {                // ← Librerías que NECESITA tu app para funcionar
    "express": "^5.1.0"
  },
  "devDependencies": {             // ← Librerías que solo necesitas para DESARROLLAR
    "dotenv": "^17.2.3",
    "nodemon": "^3.1.10"
  }
}
```

## Para qué sirve cada cosa:

### Información básica:
- **name**: El nombre de tu proyecto
- **version**: Número de versión (1.0.0, 1.1.0, etc.)
- **description**: Una frase que explique qué hace tu app
- **author**: Tu nombre o el de quien hizo el proyecto
- **license**: Qué permisos tiene la gente para usar tu código

### Archivo principal:
- **main**: El archivo que se ejecuta cuando alguien usa tu proyecto (en tu caso: `index.js`)

### Comandos (scripts):
- **scripts**: Comandos que puedes ejecutar con `npm run`
  - Ejemplo: `npm run test` ejecuta el comando de test
  - Ejemplo: `npm run start` ejecuta el comando de inicio

### Librerías que usa tu proyecto:

#### dependencies (dependencias de producción):
- **express**: Para crear servidores web (tu app lo necesita para funcionar)

#### devDependencies (dependencias de desarrollo):
- **dotenv**: Para usar variables de entorno (.env files)
- **nodemon**: Para que tu servidor se reinicie automáticamente cuando cambias código

## Comandos útiles:

```bash
# Instalar todas las librerías
npm install

# Ejecutar un comando
npm run test

# Instalar una nueva librería
npm install nombre-de-la-libreria

# Desinstalar una librería
npm uninstall nombre-de-la-libreria

# Desinstalar una librería de desarrollo
npm uninstall --save-dev nombre-de-la-libreria
```

## ⚠️ IMPORTANTE: No borres dependencias a mano

**NUNCA borres las librerías manualmente** de la carpeta `node_modules` o del `package.json`. 

### ¿Por qué no?
- Si borras del `package.json` a mano, la librería sigue instalada en `node_modules`
- Si borras de `node_modules` a mano, tu app se rompe pero el `package.json` no se actualiza
- Al hacer `npm install` después, se vuelve a instalar la librería que "borraste"

### ¿Cómo hacerlo bien?
```bash
# ✅ CORRECTO: Usar npm uninstall
npm uninstall express

# ❌ INCORRECTO: Borrar a mano del package.json
# ❌ INCORRECTO: Borrar la carpeta de node_modules
```

### ¿Qué hace npm uninstall?
1. Borra la librería de `node_modules`
2. Borra la línea del `package.json` automáticamente
3. Actualiza el `package-lock.json`
4. Todo queda limpio y sincronizado

## ¿Qué es package-lock.json?

El `package-lock.json` es como una "foto exacta" de todas las librerías que tienes instaladas.

### ¿Para qué sirve?
- **Guarda las versiones EXACTAS** de cada librería
- **Asegura que todos tengan las mismas versiones** (tú, tu compañero, el servidor)
- **Hace que `npm install` sea más rápido** (ya sabe qué instalar)

### Ejemplo:
```json
// package.json (versiones flexibles)
{
  "dependencies": {
    "express": "^5.1.0"  // ← Puede instalar 5.1.0, 5.1.1, 5.2.0, etc.
  }
}

// package-lock.json (versión exacta)
{
  "dependencies": {
    "express": {
      "version": "5.1.0",  // ← Versión EXACTA instalada
      "resolved": "https://registry.npmjs.org/express/-/express-5.1.0.tgz"
    }
  }
}
```

### ¿Por qué es importante?
- **Sin package-lock**: Tu compañero puede tener `express 5.1.0` y tú `express 5.1.5` → Problemas
- **Con package-lock**: Ambos tienen exactamente `express 5.1.0` → Sin problemas

### Reglas:
- ✅ **SÍ subirlo a Git** (es importante para el equipo)
- ❌ **NO editarlo a mano** (npm lo maneja automáticamente)
- ✅ **Regenerarlo** si se corrompe: `rm package-lock.json && npm install`