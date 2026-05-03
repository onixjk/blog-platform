import {Request, Response} from 'express';
import {HttpStatus} from "../../../../core/types/http-statuses";
import {PostAttributes} from "../../application/dtos/post.attributes";
import {postRepository} from "../../repositories/post.repository";
import {blogRepository} from "../../../blog/repositories/blog.repository";


export async function updatePostHandler(
    req: Request<{ id: string }, {}, PostAttributes>,
    res: Response
) {
    try {
        const id = req.params.id;
        const post = await postRepository.findById(id);

        if (!post) {
            // res
            //     .status(HttpStatus.NotFound_404)
            //     .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
            return;
        }

        const blog = await blogRepository.findById(req.body.blogId)

        if (!blog) {
            // res
            //     .status(HttpStatus.NotFound_404)
            //     .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
            return;
        }

        await postRepository.update(id, req.body, blog.name);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}