import {WithId} from "mongodb";
import {Post} from "../domain/post";
import {PostQueryInput} from "../routers/input/post-query.input";
import {postRepository} from "../repositories/post.repository";
import {PostAttributes} from "./dtos/post.attributes";

export const postService = {
    async findMany(
        queryDto: PostQueryInput
    ): Promise<{ items: WithId<Post>[], totalCount: number }> {
        return postRepository.findMany(queryDto);
    },

    async findByIdOrFail(id: string): Promise<WithId<Post> | null> {
        return postRepository.findByIdOrFail(id);
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

        return postRepository.create(newPost);
    },

    async update(id: string, dto: PostAttributes, blogName: string): Promise<void> {
        await postRepository.update(id, dto, blogName);
        return;
    },

    async updateBlogName(blogId: string, blogName: string): Promise<void> {
        await postRepository.updateBlogName(blogId, blogName);

        return;
    },

    async delete(id: string): Promise<void> {
        await postRepository.delete(id);
        return;
    },

    async deleteByBlogId(blogId: string): Promise<void> {
        await postRepository.deleteByBlogId(blogId);
        return;
    }

}