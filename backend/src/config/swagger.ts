import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

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
        url: 'http://localhost:3000', // Asegúrate de que este puerto sea el correcto
        description: 'Servidor de Desarrollo',
      },
    ],
  },
  // Ruta a los archivos que contienen las anotaciones de la API
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true, // Habilita el explorador de la API
      customCss: '.swagger-ui .topbar { display: none }', // Opcional: oculta la barra superior de Swagger
    })
  );
  console.log('Swagger UI está disponible en http://localhost:4000/api-docs');
};
