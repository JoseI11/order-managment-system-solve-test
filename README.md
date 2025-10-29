# 🚀 Order Management System

Sistema de gestión de pedidos con backend en Node.js/TypeScript, Prisma y PostgreSQL.

## 📋 Tabla de Contenidos
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Documentación de la API](#-documentación-de-la-api)
- [Uso con Postman](#-uso-con-postman)
- [Documentación con Swagger](#-documentación-con-swagger)
- [Próximos Pasos](#-próximos-pasos)

## ✨ Características

- **Backend**:
  - API RESTful con Express y TypeScript
  - Base de datos PostgreSQL con Prisma ORM
  - Validación de datos
  - Manejo de errores centralizado
  - Paginación y filtrado de resultados
  - Documentación con Swagger

## 🛠️ Tecnologías

- **Backend**:
  - Node.js
  - TypeScript
  - Express
  - Prisma
  - PostgreSQL
  - Swagger UI

## 📦 Requisitos Previos

- Node.js 16+
- npm o yarn
- PostgreSQL 12+
- Git

## 🚀 Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/order-managment-system.git
   cd order-managment-system/backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con tus credenciales
   ```

4. Ejecutar migraciones:
   ```bash
   npx prisma migrate dev
   ```

5. Iniciar el servidor:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

   El servidor estará disponible en: http://localhost:3000

## 🗂️ Estructura del Proyecto

```
backend/
├── prisma/
│   └── schema.prisma    # Esquema de la base de datos
├── src/
│   ├── controllers/     # Controladores
│   ├── routes/          # Rutas de la API
│   ├── services/        # Lógica de negocio
│   ├── db/              # Configuración de la base de datos
│   ├── types/           # Tipos TypeScript
│   ├── app.ts           # Configuración de Express
│   ├── index.ts         # Punto de entrada
│   └── prismaClient.ts  # Cliente de Prisma
└── .env                 # Variables de entorno
```
scm-history-item:c%3A%5CUsers%5CJose%5CDocuments%5Corder-managment-system-solve-test?%7B%22repositoryId%22%3A%22scm0%22%2C%22historyItemId%22%3A%220f336d52963ddc9a96448ce36407c1dc4d92b0c5%22%2C%22historyItemParentId%22%3A%22928b28e4468bfe53af2170a26b26748c2d9c8940%22%2C%22historyItemDisplayId%22%3A%220f336d5%22%7D
## 📚 Documentación de la API

### Órdenes

#### Crear una orden
```
POST /orders
```
**Body**:
```json
{
  "customer_name": "Juan Pérez",
  "item": "Laptop HP",
  "quantity": 1,
  "status": "pending"
}
```

#### Listar órdenes (con paginación)
```
GET /orders?page=1&page_size=10&status=pending
```

#### Obtener una orden
```
GET /orders/:id
```

#### Actualizar una orden
```
PUT /orders/:id
```
**Body**:
```json
{
  "status": "completed"
}
```

#### Eliminar una orden
```
DELETE /orders/:id
```

## 🖥️ Uso con Postman

1. Importa la colección de Postman desde:
   `docs/postman/Order_Management_API.postman_collection.json`

2. O configura manualmente los endpoints como se muestra en la documentación.

## 📖 Documentación con Swagger

La documentación interactiva de la API está disponible en:
```
http://localhost:3000/api-docs
```

## 🚧 Próximos Pasos

- [ ] Implementar autenticación JWT
- [ ] Añadir tests unitarios y de integración
- [ ] Desplegar en producción
- [ ] Crear interfaz de usuario con React/Vue

## 📄 Licencia

MIT

---

Desarrollado con amor por José Imhoff
