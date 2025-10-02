# 🎓 Guía para el Profesor - Ejercicio Progresivo Express.js

## 📋 Objetivo del Ejercicio
Llevar a los estudiantes desde lo más básico de Express.js hasta construir una API completa y profesional, replicando la funcionalidad de `src-modular`.

## 🎯 Meta Final
Los estudiantes deben crear una API con 8 endpoints que maneje usuarios con operaciones CRUD completas.

## 📚 Estructura del Ejercicio

### **Fase 1: Rutas Básicas** 🚀
**Archivo:** `fase-1-rutas-basicas.js`
**Duración estimada:** 2-3 horas
**Objetivos:**
- Crear servidor Express básico
- Implementar todas las rutas HTTP
- Manejar parámetros y datos del body
- Devolver respuestas JSON estructuradas

**Conceptos clave:**
- Rutas HTTP (GET, POST, PUT, PATCH, DELETE)
- Parámetros de URL (`req.params`)
- Datos del body (`req.body`)
- Headers (`req.headers`)
- Respuestas JSON (`res.json()`)

**Tareas para los estudiantes:**
1. Implementar todas las rutas con la estructura correcta
2. Extraer parámetros y datos correctamente
3. Responder con JSON apropiado
4. Probar todas las rutas

### **Fase 2: Servicios** ⚙️
**Archivo:** `fase-2-servicios.js`
**Duración estimada:** 3-4 horas
**Objetivos:**
- Extraer lógica de negocio a funciones de servicio
- Implementar validaciones básicas
- Simular base de datos en memoria
- Manejar errores apropiadamente

**Conceptos clave:**
- Separación de responsabilidades
- Funciones de servicio
- Validaciones de datos
- Manejo de errores
- Base de datos en memoria

**Tareas para los estudiantes:**
1. Crear funciones de servicio para cada operación
2. Implementar validaciones de negocio
3. Conectar servicios con las rutas
4. Manejar errores con try/catch

### **Fase 3: Repositorios** 🗄️
**Archivo:** `fase-3-repositorios.js`
**Duración estimada:** 2-3 horas
**Objetivos:**
- Separar acceso a datos en funciones de repositorio
- Crear funciones de utilidad
- Refactorizar servicios para usar repositorios
- Implementar arquitectura en capas

**Conceptos clave:**
- Arquitectura en capas
- Repositorios de datos
- Funciones de utilidad
- Separación de responsabilidades
- Modularidad

**Tareas para los estudiantes:**
1. Crear funciones de repositorio
2. Implementar funciones de utilidad
3. Refactorizar servicios
4. Separar lógica de datos de lógica de negocio

### **Fase 4: Integración Final** 🔗
**Archivo:** `fase-4-integracion-final.js`
**Duración estimada:** 3-4 horas
**Objetivos:**
- Crear estructura de archivos separados
- Implementar imports/exports
- Agregar middleware personalizado
- Crear estructura profesional

**Conceptos clave:**
- Estructura de archivos
- Imports/exports de Node.js
- Middleware personalizado
- Organización de código
- Estructura profesional

**Tareas para los estudiantes:**
1. Crear estructura de carpetas
2. Separar código en archivos
3. Implementar imports/exports
4. Agregar middleware personalizado

## 🎯 Criterios de Evaluación

### **Fase 1: Rutas Básicas**
- ✅ Servidor inicia sin errores
- ✅ Todas las rutas responden correctamente
- ✅ Parámetros se extraen correctamente
- ✅ Respuestas JSON tienen estructura apropiada

### **Fase 2: Servicios**
- ✅ Funciones de servicio implementadas
- ✅ Validaciones funcionan correctamente
- ✅ Errores se manejan apropiadamente
- ✅ Lógica de negocio separada de las rutas

### **Fase 3: Repositorios**
- ✅ Funciones de repositorio implementadas
- ✅ Servicios usan repositorios
- ✅ Código bien organizado y modular
- ✅ Separación clara de responsabilidades

### **Fase 4: Integración Final**
- ✅ Estructura de archivos profesional
- ✅ Imports/exports funcionando
- ✅ Middleware personalizado implementado
- ✅ Código limpio y mantenible

## 🚀 Cómo Usar el Ejercicio

### **Preparación:**
1. Crear carpeta `ejercicio-express-basico`
2. Copiar archivos de las fases
3. Instalar dependencias: `npm install`

### **Durante la clase:**
1. **Explicar la fase actual** (5-10 min)
2. **Mostrar el archivo** y explicar las tareas
3. **Dar tiempo para implementar** (según duración estimada)
4. **Revisar en conjunto** (10-15 min)
5. **Pasar a la siguiente fase**

### **Seguimiento:**
- Revisar código de cada estudiante
- Ayudar con dudas específicas
- Explicar conceptos que no entiendan
- Celebrar avances y logros

## 💡 Consejos para el Profesor

### **Fase 1:**
- Enfatizar la importancia de la estructura de respuestas
- Mostrar cómo probar las rutas con Postman
- Explicar la diferencia entre parámetros y body

### **Fase 2:**
- Enfatizar la separación de responsabilidades
- Mostrar cómo las validaciones previenen errores
- Explicar el manejo de errores con try/catch

### **Fase 3:**
- Explicar la arquitectura en capas
- Mostrar cómo los repositorios encapsulan datos
- Enfatizar la reutilización de código

### **Fase 4:**
- Mostrar la estructura de archivos profesional
- Explicar los beneficios de la modularidad
- Preparar para conceptos avanzados

## 🎉 Resultado Final

Al completar las 4 fases, los estudiantes tendrán:
- ✅ Una API completa y funcional
- ✅ Código bien organizado y modular
- ✅ Comprensión de arquitectura en capas
- ✅ Experiencia con Express.js
- ✅ Base sólida para proyectos avanzados

## 📚 Conceptos que Aprenderán

1. **Express.js básico**
2. **Rutas HTTP**
3. **Middleware**
4. **Arquitectura en capas**
5. **Separación de responsabilidades**
6. **Manejo de errores**
7. **Validaciones**
8. **Organización de código**
9. **Imports/exports**
10. **Estructura profesional**

¡Este ejercicio les dará una base sólida para desarrollar APIs profesionales! 🚀
