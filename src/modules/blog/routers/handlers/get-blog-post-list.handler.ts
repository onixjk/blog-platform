import {Request, Response} from 'express';
import {PostQueryInput} from "../../../post/routers/input/post-query.input";
import {errorsHandler} from "../../../../core/errors/errors.handler";

export async function getBlogPostListHandler(
    req: Request<{ id: string }, {}, {}, PostQueryInput>,
    res: Response,
) {
    try {
        const blogId = req.params.id;
        const queryInput = req.query;

    } catch (e:unknown) {
        errorsHandler(e, res);
    }
}