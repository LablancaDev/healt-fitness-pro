
### 📄 README - Backend: Health & Fitness Pro

# 🖥️ Health & Fitness Pro - Backend

## 🌍 Descripción del Proyecto

**Health & Fitness Pro** es una aplicación web para la monitorización del estado físico de los usuarios. Este repositorio contiene el **backend**, desarrollado con **Node.js** y **Express**, que gestiona la autenticación, almacenamiento de datos y comunicación con la base de datos **MongoDB Atlas**.

🚀 **Estado del proyecto:** 80% completado. Pendientes mejoras en la seguridad, cifrado de contraseñas con bcrypt y optimización de rendimiento.

🔗 **Frontend desplegado:** [https://frontend-healt-fitness-pro.onrender.com/]

🔗 **Backend desplegado:** [https://healt-fitness-pro.onrender.com]

## 🛠️ Tecnologías utilizadas

### 🚀 **Backend**
- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express.js**: Framework ligero para la construcción del servidor y manejo de rutas.
- **MongoDB Atlas**: Base de datos NoSQL en la nube.
- **Mongoose**: ODM para modelar datos y realizar consultas eficientes.
- **JWT (JSON Web Token)**: Autenticación segura de usuarios.
- **Dotenv**: Uso de variables de entorno para mayor seguridad.
- **CORS**: Permitir solicitudes entre el frontend y backend.
- **Bcrypt (Pendiente)**: Cifrado de contraseñas para mayor seguridad.
- **Multer**: Manejo de subida de archivos (imágenes de perfil).
- **Morgan**: Middleware para logs de solicitudes HTTP.
- **Axios**: Consumo de APIs externas desde el backend.



## 📌 Endpoints y Rutas

### **🔑 Autenticación**
- **POST** `/api/users/register` → Registro de usuario (acepta imagen de perfil).
- **POST** `/api/users/login` → Inicio de sesión con JWT.
- **GET** `/api/users/profile/:id` → Obtener perfil de usuario.
- **PUT** `/api/users/profile/:id` → Editar perfil de usuario.     

### **🎯 Gestión de Objetivos**
- **POST** `/api/goals/initialGoalUser` → Almacenar objetivo principal del usuario (perder peso, ganar músculo, mantenimiento del peso).
- **POST** `/api/goals/physicalgoals` → Almacenar los objetivos físicos (peso deseado, porcentaje de grasa deseado y tiempo estimado para conseguirlo).
- **GET** `/api/goals/goal/:userId` → Obtener los objetivos del usuario por su `userId`.

### **📊 Seguimiento y Actividades**
- **POST** `/api/progress/activityRegister` → Registrar actividad diaria (fecha, tipo de actividad, duración, calorías quemadas e ingeridas).
- **GET** `/api/progress/getDataUser` → Obtener los datos (resultados) de los usuarios y mostrarlos en una vista.
- **DELETE** `/api/users/router.deleteActivities)` → Eliminar actividades de los usuarios

### **🏋️ APIs Externas**
- **GET** `/api/exercises` → Obtener ejercicios desde **ExerciseDB API**.
- **GET** `/api/nutrition` → Datos nutricionales desde **Wger API**.

### **🖼️ Gestión de Imágenes**
- **POST** `/api/users/upload` → Subida de imágenes con **Multer**.



## 🛠️ Despliegue en Producción con Render

Este proyecto está desplegado en **Render** para su uso en producción.

### Backend en producción:
- La API del backend está disponible en [https://healt-fitness-pro.onrender.com]

El backend se encuentra listo para recibir solicitudes de la interfaz frontend, el cual está desplegado en un entorno separado.

## 🛡️ Seguridad y Middleware

✅ **Autenticación con JWT**: Protege las rutas privadas.  
✅ **Uso de variables de entorno** con `.env` para ocultar datos sensibles.  
✅ **CORS habilitado** para permitir solicitudes desde el frontend.  
✅ **Logs con Morgan** para monitorear solicitudes HTTP.  
✅ **Validación de datos con Express Validator**.
✅ **Render habilita HTTPS automáticamente** para todas las aplicaciones desplegadas, asegurando que las comunicaciones 
     entre el cliente y el servidor estén cifradas y protegidas sin necesidad de configuraciones manuales de certificados SSL.



## 📌 Funcionamiento del Backend

1. **Autenticación:**  
   - Los usuarios se registran e inician sesión con **JWT**.  
   - Los tokens se almacenan en el frontend con **Redux Persist**.  

2. **Gestión de Objetivos y Progreso:**  
   - Cada usuario establece un **objetivo general** (pérdida de peso, ganancia muscular o mantenimiento).  
   - Puede definir **subobjetivos** (peso deseado, calorías diarias, etc.).  
   - Registra actividades diarias, las cuales se almacenan en la base de datos.  

3. **Visualización de Datos:**  
   - El frontend consulta el backend para obtener información y mostrar gráficos en tiempo real.  

4. **Consumo de APIs Externas:**  
   - Se consultan ejercicios y planes nutricionales desde **ExerciseDB API** y **Wger API**.  

5. **Manejo de Imágenes:**  
   - Los usuarios pueden subir una imagen de perfil, que se almacena en el servidor.  



## 📈 Mejoras futuras
- 🔒 **Cifrado de contraseñas con bcrypt** (pendiente de implementación).  
- 🛡️ **Refuerzo de seguridad en las rutas protegidas**.  
- ⚡ **Optimización de consultas a MongoDB para mejorar el rendimiento**.  
- 📂 **Implementación de almacenamiento en la nube (ej. Cloudinary) para imágenes**.  



## 📧 Contacto
Si deseas más información sobre este proyecto, puedes escribirme a:  
✉️ [valenciano_david@hotmail.com] 

👨‍💻 **Autor:** [D.R.L] 



