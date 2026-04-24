import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../core/utils/error.utils";
import {postRepository} from "../../../blog/repositories/postRepository";
import {PostInputDto} from "../../dto/post.input-dto";


export function updatePOSTHandler(
    req: Request<{ id: string }, {}, PostInputDto>,
    res: Response
) {
    const id = req.params.id;
    const post = postRepository.findById(id);

    if (!post) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
    }

    postRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);
}