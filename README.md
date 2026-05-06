# Tripleten web_project_api_full

Descripción

Este proyecto es una aplicación web full-stack que permite a los usuarios registrarse, iniciar sesión y gestionar una colección de tarjetas con imágenes.
Los usuarios pueden crear tarjetas, dar "like", eliminar tarjetas propias y editar su perfil.

#El proyecto incluye
 autenticación segura mediante JWT, conexión a base de datos MongoDB y despliegue completo en servidor con Nginx y HTTPS.

#Funcionalidad

Registro de usuarios
Inicio de sesión con autenticación JWT
Persistencia de sesión
Edición de perfil y avatar
Crear nuevas tarjetas
Dar y quitar likes
Eliminar tarjetas propias
Protección de rutas
Comunicación frontend ↔ backend mediante API REST

#Tecnologías utilizadas

Backend
Node.js
Express.js
MongoDB + Mongoose
JWT (autenticación)
Celebrate / Joi (validación)
Winston (logs)
PM2 (gestión de procesos)
Frontend
React (Vite)
JavaScript ES6+
Fetch API
Infraestructura
Nginx (servidor web y proxy)
Certbot (SSL / HTTPS)
DuckDNS (dominios)
Linux (Ubuntu VM)

#URLs del proyecto
Frontend

https://miappgerardo.duckdns.org

Backend API

https://miappgerardo-api.duckdns.org

#Cómo ejecutar el proyecto localmente
Backend
cd backend
npm install
npm run dev
Frontend
cd frontend
npm install
npm run dev

 #Variables de entorno

Crear un archivo .env en backend:

JWT_SECRET=tu_clave_secreta
 Estado del proyecto

✔ Proyecto funcional
✔ Deploy en producción
✔ HTTPS activo
✔ API conectada

#Autor

Gerardo David Fernandez Martinez 

Falto agragar fotos y videos la verdad intente pero falle mas adelante las pongo 
