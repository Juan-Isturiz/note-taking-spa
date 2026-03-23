import { z } from 'zod';
import { NoteSchema } from '@/note';
import { BasicSchema } from '@/shared';

export const UserSchema = BasicSchema.extend({
  firstName: z.string().meta({
    description: 'User first name',
    example: 'Juan',
  }),
  lastName: z.string().meta({
    description: 'User last name',
    example: 'Isturiz',
  }),
  email: z.email().meta({
    description: 'User email',
    example: 'Y2t2w@example.com',
  }),
  password: z
    .string()
    .meta({
      description: 'User password',
      example: 'password',
    })
    .optional(),
  //Relations
  notes: z.array(NoteSchema).optional(),
}).meta({
  id: 'User',
  description: 'User entity',
});

export type User = z.infer<typeof UserSchema>;
