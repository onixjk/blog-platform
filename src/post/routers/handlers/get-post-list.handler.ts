import {Request, Response} from 'express';
import {postRepository} from "../../repositories/post.repository";


export function getPostListHandler(req: Request, res: Response) {
    const posts = postRepository.findAll();

    res.send(posts);
}