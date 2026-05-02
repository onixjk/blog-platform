import { Request, Response } from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {mapToBlogOutput} from "../mapers/map-to-blog-output.util";
import {HttpStatus} from "../../../../core/types/http-statuses";

export async function getBlogListHandler(req: Request, res: Response) {
    try {
        const blogs = await blogRepository.findMany();
        const blogViewModels = blogs.map(mapToBlogOutput);
        res.send(blogViewModels);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}