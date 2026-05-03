import {WithId} from "mongodb";
import {Post} from "../domain/post";
import {postCollection} from "../../../db/mongo.db";

export const postService = {
    async findAll(): Promise<WithId<Post>[]> {
        return postCollection.find().toArray();
    },





}