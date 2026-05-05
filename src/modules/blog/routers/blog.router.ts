import {Router} from 'express';
import {getBlogHandler} from "./handlers/get-blog.handler";
import {getBlogListHandler} from "./handlers/get-blog-list.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {paramIdValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";
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
import {
    postCreateInputValidation
} from "../../post/routers/post.input-dto.validation-middlewares";
import {createPostHandler} from "../../post/routers/handlers/create-post.handler";
import {PostSortField} from "../../post/routers/input/post-sort-field";

export const blogRouter = Router({});

blogRouter
    .get('',
        paginationAndSortingValidation(BlogSortField),
        inputValidationResultMiddleware,
        getBlogListHandler,
    )

    .get('/:id',
        paramIdValidation('id'),
        inputValidationResultMiddleware,
        getBlogHandler,
    )

    .get('/:blogId/posts',
        paramIdValidation('blogId'),
        paginationAndSortingValidation(PostSortField), //todo
        inputValidationResultMiddleware,
        getBlogPostListHandler,
    )

    .post('',
        superAdminGuardMiddleware,
        blogCreateInputValidation, //todo
        inputValidationResultMiddleware,
        createBlogHandler,
    )

    .post('/:blogId/posts',
        superAdminGuardMiddleware,
        postCreateInputValidation, //todo
        inputValidationResultMiddleware,
        createPostHandler,
    )

    .put('/:id',
        superAdminGuardMiddleware,
        paramIdValidation('id'),
        // blogUpdateInputValidation,  //todo
        inputValidationResultMiddleware,
        updateBlogHandler,
    )

    .delete('/:id',
        superAdminGuardMiddleware,
        paramIdValidation('id'),
        inputValidationResultMiddleware,
        deleteBlogHandler,
    );