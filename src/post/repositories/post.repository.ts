import {db} from "../../db/in-memory.db";
import {Post} from "../types/post";
import {PostInputDto} from "../dto/post.input-dto";

export const postRepository = {
    findAll(): Post[] {
        return db.posts
    },

    findById(id: string): Post | null {
        return db.posts.find(p => p.id === id) ?? null;
    },

    create(newPost: Post): Post {
        db.posts.push(newPost);
        return newPost;
    },

    update(id: string, dto: PostInputDto): void {
        const post = db.posts.find(p => p.id === id);

        if (!post) {
            throw new Error("Post doesn't exist");
        }

        post.title = dto.title;
        post.shortDescription = dto.shortDescription;
        post.content = dto.content;
        post.blogId = dto.blogId;

        return;
    },

    delete(id: string): void {
        const index = db.posts.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error("Blog doesn't exist");
        }

        db.posts.splice(index, 1);
    }
}