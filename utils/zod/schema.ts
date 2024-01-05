import { z } from "zod";

export const PostSchema = z.object({
  id: z.coerce.number(),
  title: z.string().optional(),
  content: z.string().optional(),
  order: z.coerce.number().optional(),
  isFeatured: z.coerce.boolean(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'REVIEW']),
  createdAt: z.date(),
  updatedAt: z.date(),
})
