import {Request, Response} from "express";
import {db} from "../../../db/in-memory.db";
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostInputDto} from "../../dto/post.input-dto";
import {postRepository} from "../post.repository";
import {Post} from "../../types/post";

export function createPostHandler(
    req: Request<{}, {}, PostInputDto>,
    res: Response
) {
    const newPost: Post = {
        id: db.posts.length ? db.posts[db.posts.length - 1].id + 1 : '1',
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: req.body.title,
    };

    postRepository.create(newPost);
    res.status(HttpStatus.Created_201).send({newPost});
}