import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blog.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {db} from "../../../db/in-memory.db";
import {Blog} from "../../types/blog";
import {BlogInputDto} from "../../dto/blog.input-dto";

export function createBlogHandler(
    req: Request<{}, {}, BlogInputDto>,
    res: Response
) {
    const newBlog: Blog = {
        id: db.blogs.length ? (Number(db.blogs[db.blogs.length - 1].id) + 1).toString() : '1',
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    };

    blogRepository.create(newBlog);
    res.status(HttpStatus.Created_201).send(newBlog);
}