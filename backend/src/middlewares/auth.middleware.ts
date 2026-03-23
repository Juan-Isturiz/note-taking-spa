import { User } from '@repo/schemas';
import { FastifyRequest } from 'fastify';
import { Logger } from '@/config/logger';
import { thrower } from '@/plugins/errors/thrower';
import { jwtUtils } from '@/utils/jwts';

export async function validateUser(req: FastifyRequest) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    thrower.exception('auth', 'unauthorized');
    return;
  }

  const token = authHeader.split(' ')[1];

  const decodedToken = jwtUtils.validateToken(token);

  if (!decodedToken) {
    thrower.exception('auth', 'invalid-token');
  }
  Logger.info('User authenticated', { decodedToken });
  req.user = decodedToken as User;
}
