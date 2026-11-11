import { Request, Response } from "express";
import { authorService } from "../services/author.service";
import { idParam, createAuthor, updateAuthor } from "../schemas";

export const authorController = {
  async list(_req: Request, res: Response) {
    res.json(await authorService.list());
  },

  async get(req: Request, res: Response) {
    const { id } = idParam.parse(req.params);
    const author = await authorService.getById(id);
    if (!author) return void res.status(404).json({ erro: "Autor não encontrado" });
    res.json(author);
  },

  async create(req: Request, res: Response) {
    const data = createAuthor.parse(req.body);
    res.status(201).json(await authorService.create(data));
  },

  async update(req: Request, res: Response) {
    const { id } = idParam.parse(req.params);
    const data = updateAuthor.parse(req.body);
    res.json(await authorService.update(id, data));
  },

  async remove(req: Request, res: Response) {
    const { id } = idParam.parse(req.params);
    await authorService.remove(id);
    res.status(204).send();
  },
};