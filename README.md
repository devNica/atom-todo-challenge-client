# atom-todo-challenge-client

# 📚 Características

    🧲 Interceptors: Global de Peticiones | Errores de Autenticacion
    🔐 Proteccion de Rutas Privadas: Funcion CanActiveFn para Rutas Privadas
    🔑 Almacenamiento de Token de Sesion 
    🔥 API Service (Auth & UserTask)
    🏗️ Estructurado por Arq Basada en Componentes
    💎 StandAlone Components
    🔔 Componente de Notificaciones Globales
    🦸 Componente de Autenticacion de Usuarios
    🔠 Componente Formulario Reactivo de Regsitro de Tareas
    📑 Componente DataTable Para Listado de Tareas Registradas


# 🚀 Instalacion y Uso

## 1. Descargar el Repositorio

## `github.com/devnica/atom-todo-challenge-client`

## 2. Instalar Depedencias

## `npm run install -E`

## 3. Ejecutar en Modo Desarrollo

## `npm run dev`

## 4. Compilar Aplicacion

## `npm run build:develop`
## `npm run build:prod`

## 5. Ejecutar en Modo Producion

## `npm start`

# 📂 Estructura del Proyecto

        ├── .editorconfig
        ├── .gitignore
        ├── angular.json
        ├── LICENSE
        ├── package-lock.json
        ├── package.json
        ├── proxy.config.json
        ├── README.md
        ├── src/
        |   ├── app/
        |   |   ├── app.component.scss
        |   |   ├── app.component.ts
        |   |   ├── app.config.ts
        |   |   ├── app.routes.ts
        |   |   ├── core/
        |   |   |   ├── guards/
        |   |   |   |   ├── auth.guard.ts
        |   |   |   ├── interceptors/
        |   |   |   |   ├── auth-error.interceptor.ts
        |   |   |   |   ├── auth.interceptor.ts
        |   |   |   ├── services/
        |   |   |   |   ├── auth-api.service.ts
        |   |   |   |   ├── auth.service.ts
        |   |   |   |   ├── notification.service.ts
        |   |   |   |   ├── user-task-api.service.ts
        |   |   |   |   ├── user-task.service.ts
        |   |   ├── features/
        |   |   |   ├── auth/
        |   |   |   |   ├── auth.routes.ts
        |   |   |   |   ├── components/
        |   |   |   |   |   ├── login-form/
        |   |   |   |   |   |   ├── auth-form.component.html
        |   |   |   |   |   |   ├── auth-form.component.scss
        |   |   |   |   |   |   ├── auth-form.component.ts
        |   |   |   |   ├── forms/
        |   |   |   |   |   ├── auth.form.ts
        |   |   |   |   ├── material-modules-auth.ts
        |   |   |   |   ├── pages/
        |   |   |   |   |   ├── login/
        |   |   |   |   |   |   ├── login.component.html
        |   |   |   |   |   |   ├── login.component.scss
        |   |   |   |   |   |   ├── login.component.ts
        |   |   |   ├── dashboard/
        |   |   |   |   ├── dashboard.component.html
        |   |   |   |   ├── dashboard.component.scss
        |   |   |   |   ├── dashboard.component.ts
        |   |   |   ├── notifications/
        |   |   |   |   ├── notification.component.html
        |   |   |   |   ├── notification.component.scss
        |   |   |   |   ├── notification.component.ts
        |   |   |   ├── tasks/
        |   |   |   |   ├── components/
        |   |   |   |   |   ├── list/
        |   |   |   |   |   |   ├── list-user-task.component.html
        |   |   |   |   |   |   ├── list-user-task.component.scss
        |   |   |   |   |   |   ├── list-user-task.component.ts
        |   |   |   |   |   ├── task-form/
        |   |   |   |   |   |   ├── task-form.component.html
        |   |   |   |   |   |   ├── task-form.component.scss
        |   |   |   |   |   |   ├── task-form.component.ts
        |   |   |   |   ├── forms/
        |   |   |   |   |   ├── task.form.ts
        |   |   |   |   ├── material.modules.ts
        |   |   ├── shared/
        |   |   |   ├── models/
        |   |   |   |   ├── api.model.ts
        |   |   |   |   ├── auth.model.ts
        |   ├── assets/
        |   |   ├── .gitkeep
        |   |   ├── css/
        |   |   |   ├── material.scss
        |   |   |   ├── normalize.scss
        |   ├── environments/
        |   |   ├── environment.prod.ts
        |   |   ├── environment.ts
        |   ├── favicon.ico
        |   ├── index.html
        |   ├── main.ts
        |   ├── styles.scss
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.spec.json