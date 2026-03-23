import { z } from 'zod';

export const PaginationMetaSchema = z.object({
  total: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
  hasPrevious: z.boolean(),
  hasNext: z.boolean(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;
export type PaginationParams = z.infer<typeof PaginateParamsSchema>;

export function createPaginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    ...PaginationMetaSchema.shape,
    items: z.array(itemSchema),
  });
}

export const PaginateParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(10),
});

export interface PaginatedResult<T> extends PaginationMeta {
  items: T[];
}
