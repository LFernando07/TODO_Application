# TODO_Application
Aplicacion de asignacion de tareas con Full Stack JavaScript

# 🛠️ Fullstack Task Manager App

Esta aplicación es un sistema completo de gestión de tareas que utiliza un stack **Node.js, Express, Prisma y React**. Permite a múltiples usuarios registrarse, iniciar sesión y gestionar sus tareas personales de manera segura mediante autenticación basada en **JWT** y cookies `httpOnly`.

---

## ✨ Características

### 🔒 Autenticación
- Inicio de sesión y registro de usuarios
- Autenticación protegida con JWT y cookies `httpOnly`
- Verificación automática de sesión al cargar la app (`useEffect` en el `AuthProvider`)

### 👤 Gestión de usuario
- Visualización y edición del perfil (nombre, username, email, contraseña)
- Validación de datos (formato de correo, unicidad de email y username)
- Actualización del contexto global `AuthContext` tras editar el perfil

### ✅ Gestión de tareas
- CRUD de tareas protegidas por sesión
- Filtrado por título y estado (`completado`)
- Listado dinámico conectado al backend

---

## 🧰 Tecnologías usadas

### Backend
- **Node.js** + **Express.js**
- **Prisma ORM** con PostgreSQL o MySQL
- **JWT** para autenticación
- Arquitectura **MVC**
- Validación de entradas y manejo de errores centralizado (`handleException`)

### Frontend
- **React**
- **React Router**
- **Axios** para consumo de API
- Contexto global (`AuthProvider`)
- `SweetAlert2` para notificaciones interactivas

---

## 🗂️ Estructura del proyecto
