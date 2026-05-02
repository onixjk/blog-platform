import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {Blog} from "../../domain/blog";
import {BlogAttributes} from "../../application/dtos/blog-attributes";
import {mapToBlogOutput} from "../mapers/map-to-blog-output.util";

export async function createBlogHandler(
    req: Request<{}, {}, BlogAttributes>,
    res: Response
) {
    try {
        const newBlog: Blog = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        };

        const createdBlog = await blogRepository.create(newBlog);
        const blogViewModel = mapToBlogOutput(createdBlog);

        res.status(HttpStatus.Created_201).send(blogViewModel);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}