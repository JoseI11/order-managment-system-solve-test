# Order Management System - Backend

A RESTful API for managing orders, built with Node.js, Express, TypeScript, and Prisma ORM.

## 🚀 Features

- CRUD operations for orders
- TypeScript for type safety
- Prisma ORM for database operations
- PostgreSQL database
- Swagger API documentation
- Docker support
- Environment-based configuration
- CORS enabled with whitelisted origins
- Health check endpoint

## 📦 Prerequisites

- Node.js 18+
- npm or yarn
- Docker and Docker Compose (for containerized development)
- PostgreSQL database (local or remote)

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other settings.

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

## 🏃‍♂️ Running the Application

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Using Docker
```bash
docker-compose up --build
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🌐 API Documentation

Once the server is running, access the API documentation at:
- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/api-docs.json`

## 📚 Database

This project uses Prisma ORM with PostgreSQL. The database schema is defined in `prisma/schema.prisma`.

### Running Migrations
```bash
npx prisma migrate dev --name init
```

### Prisma Studio
To view and edit your database in a GUI, run:
```bash
npx prisma studio
```

## 🔧 Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development, production)
- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct PostgreSQL connection string (for migrations)

## 🏗 Project Structure

```
backend/
├── src/
│   ├── config/      # Configuration files
│   ├── controllers/ # Route controllers
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── types/       # TypeScript type definitions
│   ├── app.ts       # Express application setup
│   └── index.ts     # Application entry point
├── prisma/         # Prisma schema and migrations
└── tests/          # Test files
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.