import { Request, Response } from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../../core/utils/error.utils";
import {mapToBlogViewModel} from "../mapers/map-to-blog-view-model.util";

export async function getBlogHandler(req: Request, res: Response) {
    try {
        const id = String(req.params.id);
        const blog = await blogRepository.findById(id);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
            return;
        }

        const blogViewModel = mapToBlogViewModel(blog);
        res.status(HttpStatus.Ok_200).send(blogViewModel);
    } catch (e:unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}