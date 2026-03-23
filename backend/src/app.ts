import cors from '@fastify/cors';
import Fastify, { FastifyHttpOptions } from 'fastify';
import { FastifyZodOpenApiTypeProvider } from 'fastify-zod-openapi';
import { Server } from 'http';
import { handleError } from './plugins/errors/fastify-errors';
import { swaggerPlugin } from './plugins/fastify.swagger';
import { privateRoutes, publicRoutes } from './routes';
export async function CreateApp() {
  let config: FastifyHttpOptions<Server> = {
    pluginTimeout: 60000,
  };

  const app = Fastify(config).withTypeProvider<FastifyZodOpenApiTypeProvider>();

  app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.register(swaggerPlugin);
  await app.setErrorHandler(handleError);
  await app.register(publicRoutes, { prefix: 'api' });
  await app.register(privateRoutes, { prefix: 'api' });

  await app.ready();
  return app;
}
