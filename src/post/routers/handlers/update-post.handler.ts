import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../core/utils/error.utils";
import {PostInputDto} from "../../dto/post.input-dto";
import {postRepository} from "../../repositories/post.repository";
import {blogRepository} from "../../../blog/repositories/blog.repository";


export function updatePostHandler(
    req: Request<{ id: string }, {}, PostInputDto>,
    res: Response
) {
    const id = req.params.id;
    const post = postRepository.findById(id);

    if (!post) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
        return;
    }

    const blog = blogRepository.findById(req.body.blogId)

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
        return;
    }

    postRepository.update(id, req.body, blog.name);
    res.sendStatus(HttpStatus.NoContent_204);
}