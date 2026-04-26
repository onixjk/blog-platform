import {Request, Response} from "express";
import {db} from "../../../db/in-memory.db";
import {HttpStatus} from "../../../core/types/http-statuses";
import {PostInputDto} from "../../dto/post.input-dto";
import {Post} from "../../types/post";
import {postRepository} from "../../repositories/post.repository";
import {blogRepository} from "../../../blog/repositories/blog.repository";
import {createErrorsMessages} from "../../../core/utils/error.utils";

export function createPostHandler(
    req: Request<{}, {}, PostInputDto>,
    res: Response
) {
    const blog = blogRepository.findById(req.body.blogId)

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
        return;
    }

    const newPost: Post = {
        id: db.posts.length ? (Number(db.posts[db.posts.length - 1].id) + 1).toString() : '1',
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: blog.name,
    };

    postRepository.create(newPost);

    res.status(HttpStatus.Created_201).send(newPost);
}