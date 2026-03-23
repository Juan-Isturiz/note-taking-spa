import {
  Category,
  CategoryRepository,
  CreateCategoryDTO,
  DeleteCategoryDTO,
  FindCategoryDTO,
  UpdateCategoryDTO,
} from '@repo/schemas';

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(data: CreateCategoryDTO, userId: string): Promise<Category> {
    return this.categoryRepository.create(data, userId);
  }

  async update(
    data: UpdateCategoryDTO,
    userId: string,
    id: FindCategoryDTO
  ): Promise<Category> {
    return this.categoryRepository.update(data, userId, id);
  }

  async delete(data: DeleteCategoryDTO, userId: string): Promise<void> {
    return this.categoryRepository.delete(data, userId);
  }

  async list(userId: string): Promise<Category[]> {
    return this.categoryRepository.list(userId);
  }
}
