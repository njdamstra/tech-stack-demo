import { z } from "zod";

export const PostSchema = z.object({
  $id: z.string().uuid(),
  Title: z.string().min(1),
  Content: z.string().nullish(),
  publishedAt: z.string().datetime().nullish(),
  owner: z.string().uuid(),
  State: z.enum(['DRAFTED', 'PUBLISHED', 'ARCHIVED']),
  $createdAt: z.string().datetime(),
  $updatedAt: z.string().datetime()
});

export type Post = z.infer<typeof PostSchema>;
