import {Router} from 'express';
import {getBlogHandler} from "./handlers/get-blog.handler";
import {getBlogListHandler} from "./handlers/get-blog-list.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {idValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../../core/middlewares/validation/input-validtion-result.middleware";
import {
    blogCreateInputValidation,
    blogUpdateInputValidation
} from "./blog.input-dto.validation-middlewares";
import {superAdminGuardMiddleware} from "../../../auth/middlewares/super-admin.guard-middleware";
import {
    paginationAndSortingValidation
} from "../../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {BlogSortField} from "./input/blog-sort-field";
import {getBlogPostListHandler} from "./handlers/get-blog-post-list.handler";
import {postCreateInputValidation} from "../../post/routers/post.input-dto.validation-middlewares";

export const blogRouter = Router({});

blogRouter
    .get('',
        paginationAndSortingValidation(BlogSortField),
        inputValidationResultMiddleware,
        getBlogListHandler,
    )

    .get('/:id',
        idValidation,
        inputValidationResultMiddleware,
        getBlogHandler,
    )

    .get('/:blogId/posts',
        idValidation,
        paginationAndSortingValidation(BlogSortField),
        inputValidationResultMiddleware,
        getBlogPostListHandler,
    )

    .post('',
        superAdminGuardMiddleware,
        blogCreateInputValidation,
        inputValidationResultMiddleware,
        createBlogHandler,
    )

    .post('/:blogId/posts',
        superAdminGuardMiddleware,
        postCreateInputValidation,
        inputValidationResultMiddleware,
        createBlogHandler,
    )

    .put('/:id',
        superAdminGuardMiddleware,
        idValidation,
        blogUpdateInputValidation,
        inputValidationResultMiddleware,
        updateBlogHandler,
    )

    .delete('/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deleteBlogHandler,
    );