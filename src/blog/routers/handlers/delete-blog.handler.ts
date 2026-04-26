import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../core/utils/error.utils";
import {db} from "../../../db/in-memory.db";

export function deleteBlogHandler(req: Request, res: Response) {
    const id = String(req.params.id);
    const blog = blogRepository.findById(id);

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
        return;
    }

    db.posts = db.posts.filter(p => p.blogId !== id);
    blogRepository.delete(id);

    res.sendStatus(HttpStatus.NoContent_204);
}