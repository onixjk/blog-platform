import {Request, Response} from "express";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {PostAttributes} from "../../application/dtos/post.attributes";
import {Post} from "../../domain/post";
import {postRepository} from "../../repositories/post.repository";
import {blogRepository} from "../../../blog/repositories/blog.repository";
import {mapToPostViewModel} from "../mapers/map-to-post-view-model.util";

export async function createPostHandler(
    req: Request<{}, {}, PostAttributes>,
    res: Response
) {
    try {
        const blog = await blogRepository.findById(req.body.blogId)

        if (!blog) {
            // res
            //     .status(HttpStatus.NotFound_404)
            //     .send(createErrorsMessages([{message: "Blog not found", field: "id"}]));
            return;
        }

        const newPost: Post = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        };

        const createdPost = await postRepository.create(newPost);
        const postViewModel = mapToPostViewModel(createdPost);

        res.status(HttpStatus.Created_201).send(postViewModel);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
}