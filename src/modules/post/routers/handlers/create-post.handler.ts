import {Request, Response} from "express";
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {postsService} from "../../application/posts.service";
import {PostCreateInput} from "../input/post-create.input";
import {mapToPostOutput} from "../mapers/map-to-post-output.util";
import {HttpStatus} from "../../../../core/types/http-statuses";

export async function createPostHandler(
    req: Request<{}, {}, PostCreateInput>,
    res: Response
) {
    try {
        const createdPostId = await postsService.create(
            req.body.data.attributes,
        );

        const createdPost = await postsService.findByIdOrFail(createdPostId);
        const postOutput = mapToPostOutput(createdPost);

        res.status(HttpStatus.Created_201).send(postOutput);
    } catch (e: unknown) {
        errorsHandler(e, res);
    }
}