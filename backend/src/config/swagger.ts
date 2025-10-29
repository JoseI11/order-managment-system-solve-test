import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import type { Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración para manejar las rutas de módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Opciones de configuración de Swagger
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Management API',
      version: '1.0.0',
      description: 'API para la gestión de pedidos, construida con Node.js, Express y Prisma.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desarrollo',
      },
    ],
  },
  // Rutas a los archivos que contienen las anotaciones de la API
  // Usamos path.join para asegurar rutas correctas en cualquier SO
  apis: [
    path.join(__dirname, '../routes/*.ts'),
    path.join(__dirname, '../routes/*.js') // Para producción cuando se compile a JS
  ],
};

// Generar la especificación de Swagger
const specs = swaggerJsdoc(options);

/**
 * Configura Swagger UI en la aplicación Express
 * @param app Instancia de Express
 */
export const setupSwagger = (app: Express): void => {
  // Ruta para la documentación de la API
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Order Management API',
    })
  );

  // Ruta para la especificación JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log('📚 Documentación de la API disponible en http://localhost:3000/api-docs');
};
