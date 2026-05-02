import {Request, Response} from 'express';
import {HttpStatus} from "../../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../../core/utils/error.utils";
import {postRepository} from "../../repositories/post.repository";
import {mapToPostViewModel} from "../mapers/map-to-post-view-model.util";

export async function getPostHandler(req: Request, res: Response) {
    try {
        const id = String(req.params.id);
        const post = await postRepository.findById(id);

        if (!post) {
            // res
            //     .status(HttpStatus.NotFound_404)
            //     .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
            return;
        }

        const postViewModel = mapToPostViewModel(post);
        res.status(HttpStatus.Ok_200).send(postViewModel);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}