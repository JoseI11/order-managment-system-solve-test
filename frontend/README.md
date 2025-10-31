# Order Management System - Frontend

This project is the frontend for the Order Management System, built with [Angular](https://angular.io/) and [Angular Material](https://material.angular.io/). It provides a responsive user interface for managing orders.

## 🚀 Features

- Modern, responsive UI built with Angular Material
- Order management (Create, Read, Update, Delete)
- Real-time updates
- Form validation
- Responsive design
- Docker support for containerized deployment
- Nginx web server configuration

## 📦 Prerequisites

- Node.js 18+
- npm or yarn
- Angular CLI (v19+)
- Docker and Docker Compose (for containerized development)

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment (if needed):
   - Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
   - Update API endpoints and other settings as needed

## 🏃‍♂️ Development

### Start Development Server
```bash
ng serve
```
The application will be available at `http://localhost:4200/`

### Development with Docker
```bash
docker-compose up --build
```
The application will be available at `http://localhost:8080/`

## 🏗 Project Structure

```
frontend/
├── src/
│   ├── app/              # Application components, services, and modules
│   │   ├── components/   # Reusable UI components
│   │   ├── services/     # API services
│   │   ├── models/       # TypeScript interfaces/types
│   │   ├── shared/       # Shared modules and components
│   │   └── app.module.ts # Root module
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── environments/     # Environment configurations
│   └── styles/           # Global styles
├── nginx/               # Nginx configuration for production
├── .dockerignore
├── Dockerfile           # Production Dockerfile
└── nginx.conf          # Nginx configuration
```

## 🧪 Testing

### Unit Tests
Run unit tests with Karma:
```bash
npm test
```

### End-to-End Tests
Run e2e tests with Protractor:
```bash
ng e2e
```

## 🚀 Production Build

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Production with Docker
```bash
docker build -t order-management-frontend .
docker run -p 8080:80 order-management-frontend
```

## 🔧 Configuration

### Environment Variables
- `API_URL`: Base URL for the backend API (default: `/api`)

### Nginx Configuration
- The application is served using Nginx in production
- Configuration can be found in `nginx.conf`
- API requests are proxied to the backend service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
