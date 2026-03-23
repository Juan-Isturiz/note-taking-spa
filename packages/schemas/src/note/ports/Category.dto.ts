import z from 'zod';
import { CategorySchema } from '../entities/Category.schema';

// DTO Types
export type CreateCategoryDTO = z.infer<typeof CreateCategoryDTOSchema>;
export type UpdateCategoryDTO = z.infer<typeof UpdateCategoryDTOSchema>;
export type FindCategoryDTO = z.infer<typeof FindCategoryDTOSchema>;
export type DeleteCategoryDTO = z.infer<typeof DeleteCategoryDTOSchema>;

// DTO
export const CreateCategoryDTOSchema = CategorySchema.pick({
  name: true,
});

export const UpdateCategoryDTOSchema = CategorySchema.pick({
  name: true,
});

export const FindCategoryDTOSchema = CategorySchema.pick({
  id: true,
});

export const DeleteCategoryDTOSchema = CategorySchema.pick({
  id: true,
});
