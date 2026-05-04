import {Request, Response} from 'express';
import {HttpStatus} from "../../../../core/types/http-statuses";
import {postsRepository} from "../../repositories/posts.repository";

export async function deletePostHandler(req: Request, res: Response) {
    try {
        const id = String(req.params.id);
        const post = await postsRepository.findById(id);

        // if (!post) {
        //     res
        //         .status(HttpStatus.NotFound_404)
        //         .send(createErrorsMessages([{message: "Post not found", field: "id"}]));
        //     return;
        // }

        await postsRepository.delete(id);

        res.sendStatus(HttpStatus.NoContent_204);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}