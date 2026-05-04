import {Request, Response} from 'express';
import {postsRepository} from "../../repositories/posts.repository";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {mapToPostViewModel} from "../mapers/map-to-post-view-model.util";

export async function getPostListHandler(req: Request, res: Response) {
    try {
        const posts = await postsRepository.findAll();
        const postViewModels = posts.map(mapToPostViewModel);
        res.send(postViewModels);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}