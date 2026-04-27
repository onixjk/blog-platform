import {Request, Response} from 'express';
import {HttpStatus} from "../../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../../core/utils/error.utils";
import {postRepository} from "../../repositories/post.repository";

export function deletePostHandler(req: Request, res: Response) {
    const id = String(req.params.id);
    const post = postRepository.findById(id);

    if (!post) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
        return;
    }

    postRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent_204);
}