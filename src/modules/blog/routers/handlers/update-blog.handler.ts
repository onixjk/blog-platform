import {Request, Response} from 'express';
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {blogsService} from "../../application/blogs.service";
import {BlogUpdateInput} from "../input/blog-update.input";

export async function updateBlogHandler(
    req: Request<{ id: string }, {}, BlogUpdateInput>,
    res: Response
) {
    try {
        const id = req.params.id;

        await blogsService.update(id, req.body.data.attributes);

    } catch (e: unknown) {
        errorsHandler(e, res);
    }
}