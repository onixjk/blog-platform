
import express, { Express } from "express";
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from "./core/paths/paths";
import {blogRouter} from "./blog/routers/blog.router";
import {testingRouter} from "./testing/routers/testing.router";
import {postRouter} from "./post/routers/post.routers";
import cors from 'cors';

export const setupApp = (app: Express) => {

    app.use(cors());
    app.use(express.json());

    app.use(BLOGS_PATH, blogRouter)
    app.use(POSTS_PATH, postRouter)
    app.use(TESTING_PATH, testingRouter)

    return app;
};