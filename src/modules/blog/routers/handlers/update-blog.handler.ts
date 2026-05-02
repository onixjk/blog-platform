import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {createErrorsMessages} from "../../../../core/utils/error.utils";
import {BlogAttributes} from "../../application/dtos/blog-attributes";
import {postCollection} from "../../../../db/mongo.db";

export async function updateBlogHandler(
    req: Request<{ id: string }, {}, BlogAttributes>,
    res: Response
) {
    try {
        const id = req.params.id;
        const dtoBlogName = req.body.name
        const blog = await blogRepository.findById(id);

        // if (!blog) {
        //     res
        //         .status(HttpStatus.NotFound_404)
        //         .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
        //     return;
        // }

        await postCollection.updateMany(
            {blogId: id, blogName: {$ne: dtoBlogName}},
            {$set: {blogName: dtoBlogName}}
        );

        await blogRepository.update(id, req.body);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}