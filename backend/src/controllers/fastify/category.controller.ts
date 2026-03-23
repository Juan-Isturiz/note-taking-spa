import {
  CategorySchema,
  CreateCategoryDTO,
  CreateCategoryDTOSchema,
  FindCategoryDTO,
  UpdateCategoryDTO,
  UpdateCategoryDTOSchema,
} from '@repo/schemas';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaCategoryRepository } from '@/repositories/prisma/category.repository';
import { CategoryService } from '@/services/category.service';

export async function categoryRoutes(fastify: FastifyInstance) {
  const categoryService = new CategoryService(new PrismaCategoryRepository());
  fastify.get(
    '/',
    {
      schema: {
        response: { 200: CategorySchema.array() },
        tags: ['Categories'],
      },
    },
    async (req: FastifyRequest, rep: FastifyReply) => {
      const categories = await categoryService.list(req.user!.id);
      rep.code(200).send(categories);
    }
  );

  fastify.post(
    '/',
    {
      schema: {
        body: CreateCategoryDTOSchema,
        response: {
          201: CategorySchema,
        },
        tags: ['Categories'],
      },
    },
    async (
      request: FastifyRequest<{ Body: CreateCategoryDTO }>,
      reply: FastifyReply
    ) => {
      const category = await categoryService.create(
        request.body,
        request.user!.id
      );
      reply.code(201).send(category);
    }
  );

  fastify.put(
    '/:id',
    {
      schema: {
        body: UpdateCategoryDTOSchema,
        response: {
          200: CategorySchema,
        },
        tags: ['Categories'],
      },
    },
    async (
      request: FastifyRequest<{
        Body: UpdateCategoryDTO;
        Params: FindCategoryDTO;
      }>,
      reply: FastifyReply
    ) => {
      const category = await categoryService.update(
        request.body,
        request.user!.id,
        request.params
      );
      reply.code(200).send(category);
    }
  );
}
