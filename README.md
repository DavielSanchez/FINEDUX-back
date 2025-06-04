# FINEDUX-back

## 📖 Descripción

**FINEDUX-back** es la API del sistema FINEDUX, una plataforma para automatizar procesos administrativos y financieros en escuelas. Está construido sobre Node.js, usa PostgreSQL como base de datos a través de Sequelize, e incluye documentación Swagger para facilitar el consumo de su API.

---

## ⚙️ Tecnologías principales

- **Node.js** (JavaScript en backend)
- **Express.js** (Framework web)
- **PostgreSQL** (Base de datos relacional)
- **Sequelize** (ORM para PostgreSQL)
- **JWT (jsonwebtoken)** para autenticación segura
- **bcryptjs** para encriptación de contraseñas
- **dotenv** para gestión de variables de entorno
- **morgan** para logging HTTP
- **CORS** para manejo de solicitudes cross-origin
- **Swagger-jsdoc & Swagger-ui-express** para documentación API
- **concurrently** para correr scripts en paralelo en desarrollo

---

## 🚀 Instalación y puesta en marcha

### Requisitos previos

- [Node.js](https://nodejs.org/) v14+
- [PostgreSQL](https://www.postgresql.org/)
- Clonar este repositorio

### Pasos

1. Clona el repositorio:

    ```bash
    git clone https://github.com/DavielSanchez/FINEDUX-back.git  
    cd FINEDUX-back
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Ejecuta el servidor en modo desarrollo:

    ```bash
    npm run dev
    ```

El servidor arrancará (por defecto) en [http://localhost:3000](http://localhost:3000)

---

## 📋 Scripts disponibles

| Script         | Descripción                            |  
| -------------- | ------------------------------------ |  
| `npm run dev`  | Inicia el servidor con nodemon + concurrently para desarrollo |

---

## 🗂️ Estructura de carpetas (resumen)

~~~
/controllers    # Controladores para lógica de negocio  
/models         # Definición de modelos Sequelize  
/routes         # Definición de rutas API  
/middleware     # Middlewares personalizados  
/config         # Configuración de base de datos y variables  
~~~

---

## 📄 Documentación API

La documentación Swagger está disponible en: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Allí podrás ver y probar todos los endpoints de la API.

---

## 🔐 Seguridad y autenticación

- Se utiliza **JWT** para proteger rutas y manejar sesiones.  
- Las contraseñas se almacenan encriptadas usando **bcryptjs**.  

---

## ⚠️ Aviso Legal

Este repositorio y todo su contenido **son proporcionados únicamente con fines demostrativos, educativos e ilustrativos**.

**Queda terminantemente prohibida la comercialización, redistribución o uso comercial de este código sin autorización previa y explícita del autor.**

El autor no se hace responsable por ningún uso indebido o no autorizado del código aquí presentado.

Para más detalles, por favor consulta el archivo [TERMS.md](./TERMS.md).

---

## 📧 Contacto

**Daviel Alexander Sanchez**  
[GitHub](https://github.com/DavielSanchez) | [Correo](mailto:davielsanchez14@gmail.com)

---

## 📜 Licencia

Este proyecto está bajo licencia **ISC**.

---

