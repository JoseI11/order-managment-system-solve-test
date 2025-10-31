# 🚀 Order Management System

A full-stack order management system with a modern Angular frontend and Node.js/TypeScript backend, built with scalability and maintainability in mind.

## 🌟 Features

### Backend
- **RESTful API** with Express and TypeScript
- **PostgreSQL** database with **Prisma ORM**
- Data validation and error handling
- Pagination and filtering
- **Swagger** API documentation
- **Docker** containerization
- Environment-based configuration

### Frontend
- **Angular 19** with **TypeScript**
- **Angular Material** for modern UI components
- **Responsive design** for all devices
- **Reactive forms** with validation
- **Docker** support for easy deployment
- **Nginx** web server in production

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: Express
- **ORM**: Prisma
- **Database**: PostgreSQL
- **API Docs**: Swagger UI
- **Containerization**: Docker

### Frontend
- **Framework**: Angular 19
- **UI Library**: Angular Material
- **State Management**: RxJS
- **Build Tool**: Angular CLI
- **Web Server**: Nginx (production)
- **Containerization**: Docker

## 📦 Prerequisites

### Development
- Node.js 18+
- npm or yarn
- Angular CLI 19+
- PostgreSQL 12+
- Git
- Docker & Docker Compose (optional)

## 🚀 Quick Start

### With Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/your-username/order-managment-system.git
cd order-managment-system

# Start all services
docker-compose up --build
```

### Manual Setup

#### Backend
```bash
cd backend
npm install
cp .env.example .env  # Update with your database credentials
npx prisma migrate dev
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
ng serve
```

## 🌐 Access the Application

- **Frontend**: http://localhost:4200 (dev) or http://localhost:8080 (Docker)
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api-docs
- **Database**: PostgreSQL at localhost:5432

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
```

## 📚 API Documentation

### Orders

#### Create an Order
```
POST /api/orders
```
**Request Body**:
```json
{
  "customer_name": "John Doe",
  "item": "Laptop",
  "quantity": 1,
  "status": "pending"
}
```

#### List Orders
```
GET /api/orders?page=1&page_size=10&status=pending
```

#### Get Order by ID
```
GET /api/orders/:id
```

#### Update Order
```
PUT /api/orders/:id
```

#### Delete Order
```
DELETE /api/orders/:id
```

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
ng serve
```

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
ng test
```

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
```

### Docker Deployment
```bash
docker-compose up --build -d
```

## 📖 API Documentation

Interactive API documentation is available at:
```
http://your-domain.com/api-docs
```

## 🚧 Next Steps

- [ ] Implement JWT Authentication
- [ ] Add unit and integration tests
- [ ] Set up CI/CD pipeline
- [ ] Add monitoring and logging
- [ ] Implement user roles and permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Angular](https://angular.io/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

MIT

---

Desarrollado con amor por José Imhoff
