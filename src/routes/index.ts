import { Router } from "express";
import { authorController as a } from "../controllers/author.controller";
import { postController as p } from "../controllers/post.controller";
import { prisma } from "../lib/prisma";

export const routes = Router();

routes.get("/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ status: "ok" });
});

routes.get("/authors", a.list);
routes.get("/authors/:id", a.get);
routes.post("/authors", a.create);
routes.patch("/authors/:id", a.update);
routes.delete("/authors/:id", a.remove);

routes.get("/posts", p.list);
routes.get("/posts/:id", p.get);
routes.post("/posts", p.create);
routes.patch("/posts/:id", p.update);
routes.delete("/posts/:id", p.remove);