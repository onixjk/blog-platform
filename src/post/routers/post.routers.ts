import {Router} from 'express';
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {postInputDtoValidation} from "../validation/post.input-dto.validation-middlewares";
import {getPostListHandler} from "./handlers/get-post-list.handler";
import {getPostHandler} from "./handlers/get-post.handler";
import {createPostHandler} from "./handlers/create-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";

export const blogRouter = Router({});

blogRouter
    .get('', getPostHandler,
    )

    .get('/:id',
        idValidation,
        inputValidationResultMiddleware,
        getPostListHandler,
    )

    .post('',
        superAdminGuardMiddleware,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        createPostHandler,
    )

    .put('/:id',
        idValidation,
        superAdminGuardMiddleware,
        updatePostHandler,
        inputValidationResultMiddleware,
        postInputDtoValidation,
    )

    .delete('/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deletePostHandler,
    );