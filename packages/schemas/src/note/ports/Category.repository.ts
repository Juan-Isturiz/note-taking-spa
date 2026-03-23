import { Category } from '../entities';
import {
  CreateCategoryDTO,
  DeleteCategoryDTO,
  FindCategoryDTO,
  UpdateCategoryDTO,
} from './Category.dto';

export interface CategoryRepository {
  create(data: CreateCategoryDTO, userId: string): Promise<Category>;
  delete(data: DeleteCategoryDTO, userId: string): Promise<void>;
  update(
    data: UpdateCategoryDTO,
    userId: string,
    id: FindCategoryDTO
  ): Promise<Category>;
  list(userId: string): Promise<Category[]>;
}
