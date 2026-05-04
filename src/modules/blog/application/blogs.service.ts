import {BlogQueryInput} from "../routers/input/blog-query.input";
import {Blog} from "../domain/blog";
import {WithId} from "mongodb";
import {blogRepository} from "../repositories/blog.repository";
import {BlogAttributes} from "./dtos/blog-attributes";
import {postService} from "../../post/application/posts.service";


export const blogsService = {
    async findMany(
        queryDto: BlogQueryInput,
    ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
        return blogRepository.findMany(queryDto);
    },

    async findByIdOrFail(id: string): Promise<WithId<Blog>> {
        return blogRepository.findByIdOrFail(id);
    },

    async create(dto: BlogAttributes): Promise<string> {
        const newBlog: Blog = {
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false,
        }

        return blogRepository.create(newBlog);
    },

    async update(id: string, dto: BlogAttributes): Promise<void> {
        await postService.updateBlogName(id, dto.name);
        await blogRepository.update(id, dto);

        return;
    },

    async delete(id: string): Promise<void> {
        await postService.deleteAllByBlogId(id)
        await blogRepository.delete(id);

        return;
    }
}