
import express, { Express } from "express";
import {BLOGS_PATH, TESTING_PATH} from "./core/paths/paths";
import {blogRouter} from "./blog/routers/blog.router";
import {testingRouter} from "./testing/routers/testing.router";

export const setupApp = (app: Express) => {
    app.use(express.json());
    app.use(BLOGS_PATH, blogRouter)
    app.use(TESTING_PATH, testingRouter)

    return app;
};