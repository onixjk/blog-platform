import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../core/utils/error.utils";
import {BlogInputDto} from "../../dto/blog.input-dto";

export function updateBlogHandler(
    req: Request<{ id: string }, {}, BlogInputDto>,
    res: Response
) {
    const id = req.params.id;
    const blog = blogRepository.findById(id);

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
    }

    blogRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);
}