import {BlogAttributes} from "../application/dtos/blog-attributes";
import {Blog} from "../domain/blog";
import {blogCollection} from "../../../db/mongo.db";
import {ObjectId, WithId} from "mongodb";
import {BlorQueryInput} from "../routers/input/blog-query.input";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found.error";

export const blogRepository = {
    async findMany(queryDto: BlorQueryInput): Promise<{ items: WithId<Blog>[], totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchBlogNameTerm,
            searchBlogWebsiteUrlTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchBlogNameTerm) {
            filter.name = { $regex: searchBlogNameTerm, $options: 'i' };
        }

        if (searchBlogWebsiteUrlTerm) {
            filter.websiteUrl = { $regex: searchBlogWebsiteUrlTerm, $options: 'i' };
        }

        const items = await blogCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogCollection.countDocuments(filter);

        return { items, totalCount };
    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({_id: new ObjectId(id)});
    },

    async findByIdOrFail(id: string): Promise<WithId<Blog> | null> {
        const res = blogCollection.findOne({_id: new ObjectId(id)});

        if (!res) {
            throw new RepositoryNotFoundError('Blog not exist');
        }

        return res;
    }

    async create(newBlog: Blog): Promise<WithId<Blog>> {
        const insertResult = await blogCollection.insertOne(newBlog)
        return {...newBlog, _id: insertResult.insertedId};
    },

    async update(id: string, dto: BlogAttributes): Promise<void> {
        const updateResult = await blogCollection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {
                    name: dto.name,
                    description: dto.description,
                    websiteUrl: dto.websiteUrl,
                },
            },
        );

        if (updateResult.matchedCount < 1) {
            throw new Error("Blog doesn't exist");
        }
        return;
    },

    async delete(id: string): Promise<void> {
        const deleteResult = await blogCollection.deleteOne({_id: new ObjectId(id)});

        if (deleteResult.deletedCount < 1) {
            throw new Error("Blog doesn't exist");
        }
        return;
    }
}