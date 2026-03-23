import z from 'zod';
import { BasicSchema } from '@/shared';

export type Category = z.infer<typeof CategorySchema>;

export const CategorySchema = BasicSchema.extend({
  name: z.string().meta({
    description: 'Category name',
    example: 'Work',
  }),
  userId: z.uuid().meta({
    description: 'User ID',
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  }),
}).meta({
  id: 'Category',
  description: 'Category entity',
});
