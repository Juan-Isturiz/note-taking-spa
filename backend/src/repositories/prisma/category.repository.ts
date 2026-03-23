import { Category, CategoryRepository } from '@repo/schemas';
import { Logger } from '@/config/logger';
import prisma from '@/config/prisma';

export class PrismaCategoryRepository implements CategoryRepository {
  create(data: any, userId: string): Promise<Category> {
    Logger.info('Creating category', { data, userId });
    const savedCategory = prisma.category.create({ data: { ...data, userId } });
    return savedCategory;
  }
  async delete(data: any, userId: string): Promise<void> {
    Logger.info('Deleting category', { data, userId });
    prisma.category.delete({ where: { ...data, userId } });
  }
  async update(data: any, userId: string, id: any): Promise<Category> {
    Logger.info('Updating category', { data, userId, id });
    const savedCategory = prisma.category.update({
      where: { ...id, userId },
      data,
    });
    return savedCategory;
  }

  async list(userId: string): Promise<Category[]> {
    Logger.info('Listing categories', { userId });
    return prisma.category.findMany({ where: { userId } });
  }
}
