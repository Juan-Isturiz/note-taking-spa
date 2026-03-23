import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import {
  fastifyZodOpenApiPlugin,
  fastifyZodOpenApiTransformers,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-zod-openapi';

interface ExtendedSwaggerOptions extends FastifyDynamicSwaggerOptions {
  transformObject?: (obj: any) => any;
}
const swaggerOptions: ExtendedSwaggerOptions = {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: 'Notes API',
      version: '0.0.1',
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Enter your JWT token in the format: Bearer <token>',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  ...fastifyZodOpenApiTransformers,
};

export const swaggerPlugin = fp(async (app: FastifyInstance) => {
  app
    .setValidatorCompiler(validatorCompiler)
    .setSerializerCompiler(serializerCompiler);

  await app.register(fastifyZodOpenApiPlugin);

  await app.register(fastifySwagger, swaggerOptions);

  await app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'none',
      deepLinking: true,
      syntaxHighlight: {
        theme: 'monokai',
      },
      displayRequestDuration: true,
    },
    staticCSP: true,
  });
});
