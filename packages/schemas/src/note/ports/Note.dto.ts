import z from 'zod';
import { createPaginatedSchema, PaginateParamsSchema } from '@/shared';
import { NoteSchema } from '../entities';

// DTO Types
export type CreateNoteDTO = z.infer<typeof CreateNoteDTOSchema>;
export type UpdateNoteDTO = z.infer<typeof UpdateNoteDTOSchema>;
export type FindNoteDTO = z.infer<typeof FindNoteDTOSchema>;
export type FilterNoteDTO = z.infer<typeof FilterNoteDTOSchema>;
export type DeleteNoteDTO = z.infer<typeof DeleteNoteDTOSchema>;
export type PaginatedNoteDTO = z.infer<typeof PaginatedNoteDTOSchema>;

// DTO
export const CreateNoteDTOSchema = NoteSchema.pick({
  title: true,
  content: true,
  userId: true,
}).extend({
  categories: z.array(z.uuid()).optional(),
});

export const UpdateNoteDTOSchema = NoteSchema.pick({
  title: true,
  content: true,
  isArchived: true,
})
  .extend({
    categories: z.array(z.uuid()).optional(),
  })
  .partial();

export const FindNoteDTOSchema = NoteSchema.pick({
  id: true,
});

export const DeleteNoteDTOSchema = NoteSchema.pick({
  id: true,
});

export const FilterNoteDTOSchema = PaginateParamsSchema.extend({
  isArchived: z
    .enum(['true', 'false'])
    .optional()
    .transform((val) => {
      if (val === undefined) {
        return undefined;
      }
      return val === 'true';
    }),
  category: z.uuid().optional(),
});

export const PaginatedNoteDTOSchema = createPaginatedSchema(NoteSchema);
