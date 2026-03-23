import { User } from '@repo/schemas';

declare module 'fastify' {
  interface FastifyRequest {
    user: User | null;
  }
}
