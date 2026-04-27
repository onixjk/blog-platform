import {Request, Response} from 'express';
import {HttpStatus} from "../../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../../core/utils/error.utils";
import {postRepository} from "../../repositories/post.repository";

export function getPostHandler(req: Request, res: Response) {
    const id = String(req.params.id);
    const post = postRepository.findById(id);

    if (!post) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
        return;
    }

    res.send(post);
}