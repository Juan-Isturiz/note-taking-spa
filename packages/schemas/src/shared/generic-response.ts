import z from 'zod';

export type GenericResponse = z.infer<typeof GenericResponseSchema>;

export const GenericResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
