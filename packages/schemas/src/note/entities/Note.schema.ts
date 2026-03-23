import z from 'zod';
import { BasicSchema } from '@/shared';
import { CategorySchema } from './Category.schema';

export const NoteSchema = BasicSchema.extend({
  title: z.string().meta({
    description: 'Note title',
    example: 'My first note',
  }),
  content: z.string().meta({
    description: 'Note content',
    example: 'This is my first note',
  }),
  isArchived: z.boolean().meta({
    description: 'Note is archived',
    example: true,
  }),
  //Relations
  userId: z.uuid().meta({
    description: 'User ID',
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  }),
  categories: z.array(CategorySchema).optional(),
}).meta({
  id: 'Note',
  description: 'Note entity',
});

export type Note = z.infer<typeof NoteSchema>;
