import { Request, Response } from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../core/utils/error.utils";

export function deleteBlogHandler(req: Request, res: Response) {
    const id = req.params.id.toString();
    const blog = blogRepository.findById(id);

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
        return;
    }

    blogRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent_204);
}