import { z } from "zod";

//Validação antes do banco

export const idParam = z.object({
  id: z.coerce.number().int().positive(),
});

export const createAuthor = z.object({
  name: z.string().min(2),
  email: z.email(),
});
export const updateAuthor = createAuthor.partial();

export const createPost = z.object({
  title: z.string().min(3),
  content: z.string().optional(),
  published: z.boolean().optional(),
  authorId: z.number().int().positive(),
});
export const updatePost = createPost.omit({ authorId: true }).partial();

export const listPosts = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  published: z.enum(["true", "false"]).optional(),
  authorId: z.coerce.number().int().optional(),
});