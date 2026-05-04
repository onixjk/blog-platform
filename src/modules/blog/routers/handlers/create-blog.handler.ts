import {Request, Response} from 'express';
import {HttpStatus} from "../../../../core/types/http-statuses";
import {mapToBlogOutput} from "../mapers/map-to-blog-output.util";
import {blogService} from "../../application/blogs.service";
import {BlogCreateInput} from "../input/blog-create.input";
import {errorsHandler} from "../../../../core/errors/errors.handler";

export async function createBlogHandler(
    req: Request<{}, {}, BlogCreateInput>,
    res: Response
) {
    try {
        const createdBlogId = await blogService.create(
            req.body.data.attributes,
            );

        const createdBlog = await blogService.findByIdOrFail(createdBlogId);
        const blogOutput = mapToBlogOutput(createdBlog);

        res.status(HttpStatus.Created_201).send(blogOutput);
    } catch (e: unknown) {
        errorsHandler(e, res);
    }
}