import {
  CreateNoteDTO,
  CreateNoteDTOSchema,
  FilterNoteDTO,
  FilterNoteDTOSchema,
  FindNoteDTO,
  NoteSchema,
  PaginatedNoteDTOSchema,
  UpdateNoteDTOSchema,
} from '@repo/schemas';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaNoteRepository } from '@/repositories/prisma/note.repository';
import { NoteService } from '@/services/note.service';

interface CreateNoteDTOWithOutUserId extends Omit<CreateNoteDTO, 'userId'> {}

export async function noteRoutes(fastify: FastifyInstance) {
  const noteService = new NoteService(new PrismaNoteRepository());

  fastify.post(
    '/',
    {
      schema: {
        body: CreateNoteDTOSchema.omit({ userId: true }),
        response: {
          201: NoteSchema,
        },
        tags: ['Notes'],
      },
    },
    async (
      request: FastifyRequest<{ Body: CreateNoteDTOWithOutUserId }>,
      reply: FastifyReply
    ) => {
      const noteInput = request.body as CreateNoteDTO;
      noteInput.userId = request.user!.id;
      const note = await noteService.create(noteInput);
      reply.code(201).send(note);
    }
  );

  fastify.put(
    '/:id',
    {
      schema: {
        body: UpdateNoteDTOSchema,
        response: {
          200: NoteSchema,
        },
        tags: ['Notes'],
      },
    },
    async (
      request: FastifyRequest<{ Body: CreateNoteDTO; Params: FindNoteDTO }>,
      reply: FastifyReply
    ) => {
      const note = await noteService.update(
        request.body,
        request.params,
        request.user!.id
      );
      reply.code(200).send(note);
    }
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        response: {
          204: {},
        },
        tags: ['Notes'],
      },
    },
    async (
      request: FastifyRequest<{ Params: FindNoteDTO }>,
      reply: FastifyReply
    ) => {
      await noteService.delete(request.params, request.user!.id);
      reply.code(204).send();
    }
  );

  fastify.get(
    '/',
    {
      schema: {
        querystring: FilterNoteDTOSchema,
        response: {
          200: PaginatedNoteDTOSchema,
        },
        tags: ['Notes'],
      },
    },
    async (
      request: FastifyRequest<{ Querystring: FilterNoteDTO }>,
      reply: FastifyReply
    ) => {
      const notes = await noteService.filter(request.query, request.user!.id);
      reply.code(200).send(notes);
    }
  );

  fastify.get(
    '/:id',
    {
      schema: {
        response: {
          200: NoteSchema,
        },
        tags: ['Notes'],
      },
    },
    async (
      request: FastifyRequest<{ Params: FindNoteDTO }>,
      reply: FastifyReply
    ) => {
      const note = await noteService.findOne(request.params, request.user!.id);
      reply.code(200).send(note);
    }
  );
}
