import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

type ListFilters = {
  page: number;
  limit: number;
  published?: "true" | "false";
  authorId?: number;
};

export const postService = {
  async list({ page, limit, published, authorId }: ListFilters) {
    const where: Prisma.PostWhereInput = {
      ...(published && { published: published === "true" }),
      ...(authorId && { authorId }),
    };

    // $transaction garante que as duas consultas rodam juntas
    const [data, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        include: { author: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  },

  getById: (id: number) =>
    prisma.post.findUnique({ where: { id }, include: { author: true } }),

  create: (data: Prisma.PostUncheckedCreateInput) =>
    prisma.post.create({ data }),

  update: (id: number, data: Prisma.PostUpdateInput) =>
    prisma.post.update({ where: { id }, data }),

  remove: (id: number) => prisma.post.delete({ where: { id } }),
};