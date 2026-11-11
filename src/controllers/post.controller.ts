import { Request, Response } from "express";
import { postService } from "../services/post.service";
import { idParam, createPost, updatePost, listPosts } from "../schemas";

export const postController = {
  async list(req: Request, res: Response) {
    const filters = listPosts.parse(req.query);
    res.json(await postService.list(filters));
  },

  async get(req: Request, res: Response) {
    const { id } = idParam.parse(req.params);
    const post = await postService.getById(id);
    if (!post) return void res.status(404).json({ erro: "Post não encontrado" });
    res.json(post);
  },

  async create(req: Request, res: Response) {
    const data = createPost.parse(req.body);
    res.status(201).json(await postService.create(data));
  },

  async update(req: Request, res: Response) {
    const { id } = idParam.parse(req.params);
    const data = updatePost.parse(req.body);
    res.json(await postService.update(id, data));
  },

  async remove(req: Request, res: Response) {
    const { id } = idParam.parse(req.params);
    await postService.remove(id);
    res.status(204).send();
  },
};