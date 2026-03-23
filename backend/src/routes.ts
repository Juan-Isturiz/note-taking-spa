import { FastifyInstance } from 'fastify';
import { authRoutes } from './controllers/fastify/auth.controller';
import { categoryRoutes } from './controllers/fastify/category.controller';
import { noteRoutes } from './controllers/fastify/note.controller';
import { validateUser } from './middlewares/auth.middleware';

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });
  fastify.register(authRoutes, { prefix: '/v1/auth' });
}

export async function privateRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', validateUser);
  fastify.register(noteRoutes, { prefix: '/v1/notes' });
  fastify.register(categoryRoutes, { prefix: '/v1/categories' });
}
