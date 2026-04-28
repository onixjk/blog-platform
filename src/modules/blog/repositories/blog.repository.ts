import {db} from "../../../db/in-memory.db";
import {BlogInputDto} from "../dto/blog.input-dto";
import {Blog} from "../types/blog";
import {blogCollection} from "../../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";


export const blogRepository = {

    async findAll(): Promise<WithId<Blog>[]> {
        return blogCollection.find().toArray();
    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({_id: new ObjectID(id)});
    },

    async create(newBlog: Blog): Promise<WithId<Blog>>{
        const insertResult = blogCollection.insertOne(newBLog)
        return { ... newBlog, _id: insertResult.insertedId };
    },

    update(id: string, dto: BlogInputDto): void {
        const blog = db.blogs.find(b => b.id === id);

        if (!blog) {
            throw new Error("Blog doesn't exist");
        }

        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;
    },

    delete(id: string): void {
        const index = db.blogs.findIndex(b => b.id === id);

        if (index === -1) {
            throw new Error("Blog doesn't exist");
        }

        db.blogs.splice(index, 1);
    }
}