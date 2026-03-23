import {
  CreateNoteDTO,
  DeleteNoteDTO,
  FilterNoteDTO,
  FindNoteDTO,
  NoteRepository,
  PaginatedNoteDTO,
  UpdateNoteDTO,
} from '@repo/schemas';
import { Prisma } from 'generated/prisma/client';
import { prisma } from '@/config/prisma';
import { thrower } from '@/plugins/errors/thrower';

export class PrismaNoteRepository implements NoteRepository {
  async create(data: CreateNoteDTO) {
    const { categories, ...rest } = data;

    if (!categories) {
      return prisma.note.create({ data: rest });
    }

    return prisma.note.create({
      data: {
        ...rest,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      },
    });
  }
  async update(data: UpdateNoteDTO, id: FindNoteDTO, userId: string) {
    const { categories, ...rest } = data;

    if (!categories) {
      return prisma.note.update({ data: rest, where: { ...id, userId } });
    }

    await prisma.note.update({
      where: { ...id, userId },
      data: {
        categories: {
          set: categories.map((id) => ({ id })),
        },
      },
    });
    return prisma.note.update({ data: rest, where: { ...id, userId } });
  }
  async delete(id: DeleteNoteDTO, userId: string) {
    await prisma.note.delete({ where: { ...id, userId } });
  }
  async filter(data: FilterNoteDTO, userId: string) {
    const { isArchived, category, page, pageSize } = data;
    const where: Prisma.NoteWhereInput = {
      isArchived,
      userId,
    };

    if (category) {
      where.categories = {
        some: {
          id: category,
        },
      };
    }

    const total = await prisma.note.count({
      where,
    });

    const totalPages = Math.ceil(total / pageSize);

    if (page > totalPages && page !== 1) {
      throw thrower.exception('note', 'page-out-of-range');
    }

    const notes = await prisma.note.findMany({
      where,
      include: {
        categories: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const paginatedResponse: PaginatedNoteDTO = {
      items: notes,
      total,
      totalPages,
      currentPage: page,
      pageSize,
      hasPrevious: page > 1,
      hasNext: page < totalPages,
    };

    return paginatedResponse;
  }
  async findOne(data: FindNoteDTO, userId: string) {
    const note = await prisma.note.findUnique({ where: { ...data, userId } });
    if (!note) {
      throw thrower.exception('note', 'not-found');
    }
    return note;
  }
}
