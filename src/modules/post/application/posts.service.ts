import {WithId} from "mongodb";
import {Post} from "../domain/post";
import {PostQueryInput} from "../routers/input/post-query.input";
import {postsRepository} from "../repositories/posts.repository";
import {PostAttributes} from "./dtos/post.attributes";
import {blogsRepository} from "../../blog/repositories/blogs.repository";
import {blogsService} from "../../blog/application/blogs.service";

export const postsService = {
    async findMany(
        queryDto: PostQueryInput
    ): Promise<{ items: WithId<Post>[], totalCount: number }> {
        return postsRepository.findMany(queryDto);
    },

    async findPostsByBlog(
        queryDto: PostQueryInput,
        blogId: string,
    ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
        await blogsRepository.findByIdOrFail(blogId);

        return postsRepository.findPostsByBlog(queryDto, blogId);
    },

    async findByIdOrFail(id: string): Promise<WithId<Post>> {
        return postsRepository.findByIdOrFail(id);
    },

    async create(dto: PostAttributes): Promise<string> {
        const blog = await blogsService.findByIdOrFail(dto.blogId);

        const newPost: Post = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString(),
        }

        return postsRepository.create(newPost);
    },

    async update(id: string, dto: PostAttributes): Promise<void> {
        const blog = await blogsService.findByIdOrFail(dto.blogId);

        await postsRepository.update(id, dto, blog.name);
        return;
    },

    async updateBlogName(blogId: string, blogName: string): Promise<void> {
        await postsRepository.updateBlogName(blogId, blogName);

        return;
    },

    async delete(id: string): Promise<void> {
        await postsRepository.delete(id);
        return;
    },

    async deleteAllByBlogId(blogId: string): Promise<void> {
        await postsRepository.deleteAllByBlogId(blogId);
        return;
    }

}