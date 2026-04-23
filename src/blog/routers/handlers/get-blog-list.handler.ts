import { Request, Response } from 'express';
import {blogRepository} from "../../repositories/blog.repository";

export function getDriverListHandler(req: Request, res: Response) {
    const blogs = blogRepository.findAll();

    res.send(blogs);
}