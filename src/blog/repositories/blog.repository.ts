import {db} from "../../db/in-memory.db";
import {BlogInputDto} from "../dto/blog.input-dto";
import {Blog} from "../types/blog";


export const blogRepository = {
    findAll(): Blog[] {
        return db.blogs
    },

    findById(id: string): Blog | null {
        return db.blogs.find(b => b.id === id) ?? null;
    },

    create(newBlog: Blog): Blog {
        db.blogs.push(newBlog);
        return newBlog;
    },

    update(id: string, dto: BlogInputDto): void {
        const blog = db.blogs.find(b => b.id === id);

        if (!blog) {
            throw new Error("Blog doesn't exist");
        }

        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;

        return;
    },

    delete(id: string): void {
        // const index = db.blogs.findIndex(b => b.id === id);
        //
        // if (index > -1) {
        //     throw new Error("Blog doesn't exist");
        // }
        //
        // db.blogs.splice(index, 1);
        db.blogs = [];
    }
}