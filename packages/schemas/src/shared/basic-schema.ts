import { z } from 'zod';

export const BasicSchema = z.object({
  id: z.uuid().meta({
    description: 'UUID',
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
  }),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
