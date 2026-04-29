import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../../core/utils/error.utils";
import {postCollection} from "../../../../db/mongo.db";

export async function deleteBlogHandler(req: Request, res: Response) {
    try {
        const id = String(req.params.id);
        const blog = await blogRepository.findById(id);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
            return;
        }

        // await postCollection.deleteMany({blogId: id});
        await blogRepository.delete(id);

        res.sendStatus(HttpStatus.NoContent_204);
    } catch (e:unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}