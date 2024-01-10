import { z } from "zod";

export const PostOptions = ['Draft', 'Published', 'Review'] as const
export const PostSchema = z.object({
  id: z.coerce.number(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  order: z.coerce.number().nullable(),
  isFeatured: z.coerce.boolean(),
  status: z.enum(PostOptions),
})
