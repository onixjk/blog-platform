import {Post} from "../domain/post";
import {PostAttributes} from "../application/dtos/post.attributes";
import {ObjectId, WithId} from "mongodb";
import {blogCollection, postCollection} from "../../../db/mongo.db";
import {PostQueryInput} from "../routers/input/post-query.input";
import {Blog} from "../../blog/domain/blog";
import {RepositoryNotFoundError} from "../../../core/errors/repository-not-found.error";

export const postRepository = {
    async findMany(
        queryDto: PostQueryInput
    ): Promise<{ items: WithId<Post>[], totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchPostTitleTerm,
            searchPostNameTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchPostTitleTerm) {
            filter.name = {$regex: searchPostTitleTerm, $options: 'i'};
        }

        if (searchPostNameTerm) {
            filter.websiteUrl = {$regex: searchPostNameTerm, $options: 'i'};
        }

        const items = await postCollection
            .find(filter)
            .sort({[sortBy]: sortDirection})
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments(filter);

        return {items, totalCount};
    },

    async findById(id: string): Promise<WithId<Post> | null> {
        return postCollection.findOne({_id: new ObjectId(id)});
    },

    async findByIdOrFail(id: string): Promise<WithId<Post> | null> {
        const res = postCollection.findOne({_id: new ObjectId(id)});

        if (!res) {
            throw new RepositoryNotFoundError('Post not exist');
        }

        return res;
    },

    async create(newPost: Post): Promise<string> {
        const insertResult = await postCollection.insertOne(newPost);

        return insertResult.insertedId.toString()
    },

    async update(id: string, dto: PostAttributes, blogName: string): Promise<void> {
        const updateResult = await postCollection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: {
                    title: dto.title,
                    shortDescription: dto.shortDescription,
                    content: dto.content,
                    blogId: dto.blogId,
                    blogName: blogName,
                }
            }
        );

        if (updateResult.matchedCount < 1) {
            throw new Error("Post doesn't exist");
        }
        return;
    },

    async updateByBlogId(blogId: string, blogName: string): Promise<void> {
        const updateResult = await postCollection.updateOne(
            {
                blogId: blogId
            },
            {
                $set: {
                    blogName: blogName,
                }
            }
        );

        if (updateResult.matchedCount < 1) {
            throw new Error("Post doesn't exist");
        }

        return;
    },

    async delete(id: string): Promise<void> {
        const deleteResult = await postCollection.deleteOne({_id: new ObjectId(id)});

        if (deleteResult.deletedCount < 1) {
            throw new Error("Post not exist");
        }

        return;
    },

    async deleteByBlogId(blogId: string): Promise<void> {
        const deleteResult = await postCollection.deleteMany({blogId: blogId});

        if (deleteResult.deletedCount < 1) {
            throw new Error("Post not exist");
        }

        return;
    }
}