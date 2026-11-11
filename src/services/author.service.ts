import { prisma } from "../lib/prisma";

type AuthorData = { name: string; email: string };

export const authorService = {
  list: () =>
    prisma.author.findMany({
      include: { _count: { select: { posts: true } } },
      orderBy: { id: "asc" },
    }),

  getById: (id: number) =>
    prisma.author.findUnique({
      where: { id },
      include: { posts: true },
    }),

  create: (data: AuthorData) => prisma.author.create({ data }),

  update: (id: number, data: Partial<AuthorData>) =>
    prisma.author.update({ where: { id }, data }),

  remove: (id: number) => prisma.author.delete({ where: { id } }),
};