import {
  AuthResponseDTOSchema,
  LoginUserDTO,
  LoginUserDTOSchema,
  RegisterUserDTO,
  RegisterUserDTOSchema,
  UserSchema,
} from '@repo/schemas';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaUserRepository } from '@/repositories/prisma/user.repository';
import { UserService } from '@/services/user.service';

export async function authRoutes(fastify: FastifyInstance) {
  const userService = new UserService(new PrismaUserRepository());

  fastify.post(
    '/register',
    {
      schema: {
        body: RegisterUserDTOSchema,
        response: {
          201: UserSchema,
        },
        tags: ['Auth'],
      },
    },
    async (
      request: FastifyRequest<{ Body: RegisterUserDTO }>,
      reply: FastifyReply
    ) => {
      const user = await userService.register(request.body);
      reply.code(201).send(user);
    }
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: LoginUserDTOSchema,
        response: {
          200: AuthResponseDTOSchema,
        },
        tags: ['Auth'],
      },
    },
    async (
      request: FastifyRequest<{ Body: LoginUserDTO }>,
      reply: FastifyReply
    ) => {
      const reponse = await userService.login(request.body);
      reply.code(200).send(reponse);
    }
  );
}
