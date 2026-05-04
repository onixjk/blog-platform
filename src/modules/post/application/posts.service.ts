import {WithId} from "mongodb";
import {Post} from "../domain/post";
import {PostQueryInput} from "../routers/input/post-query.input";
import {postsRepository} from "../repositories/posts.repository";
import {PostAttributes} from "./dtos/post.attributes";
import {blogsRepository} from "../../blog/repositories/blogs.repository";

export const postService = {
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

    async findByIdOrFail(id: string): Promise<WithId<Post> | null> {
        return postsRepository.findByIdOrFail(id);
    },

    async create(dto: PostAttributes, blogName: string): Promise<string> {
        const newPost: Post = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId,
            blogName: blogName,
            createdAt: new Date().toISOString(),
        }

        return postsRepository.create(newPost);
    },

    async update(id: string, dto: PostAttributes, blogName: string): Promise<void> {
        await postsRepository.update(id, dto, blogName);
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