import { Request, Response } from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {mapToBlogViewModel} from "../mapers/map-to-blog-view-model.util";
import {HttpStatus} from "../../../../core/types/http-statuses";

export async function getBlogListHandler(req: Request, res: Response) {
    try {
        const blogs = await blogRepository.findAll();
        const blogViewModels = blogs.map(mapToBlogViewModel);
        res.send(blogViewModels);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }

}