import {Request, Response} from 'express';
import {HttpStatus} from "../../../../core/types/http-statuses";
import {PostAttributes} from "../../application/dtos/post.attributes";
import {postsRepository} from "../../repositories/posts.repository";
import {blogsRepository} from "../../../blog/repositories/blogs.repository";


export async function updatePostHandler(
    req: Request<{ id: string }, {}, PostAttributes>,
    res: Response
) {
    try {
        const id = req.params.id;
        const post = await postsRepository.findById(id);

        if (!post) {
            // res
            //     .status(HttpStatus.NotFound_404)
            //     .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
            return;
        }

        const blog = await blogsRepository.findById(req.body.blogId)

        if (!blog) {
            // res
            //     .status(HttpStatus.NotFound_404)
            //     .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
            return;
        }

        await postsRepository.update(id, req.body, blog.name);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}