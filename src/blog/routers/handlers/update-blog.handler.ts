import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../core/utils/error.utils";
import {BlogInputDto} from "../../dto/blog.input-dto";
import {db} from "../../../db/in-memory.db";

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
        return;
    }

    db.posts.forEach(p => {
        if (p.blogId === id) {
            p.blogName = blog.name;
        }
    });

    blogRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);
}