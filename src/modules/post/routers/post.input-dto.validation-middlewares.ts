import {body} from "express-validator";
import {resourceTypeValidation} from "../../../core/middlewares/validation/resource-type.validation-middleware";
import {ResourceType} from "../../../core/types/resource-type";
import {dataIdMatchValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";

const titleValidation = body('data.attributes.title')
    .exists()
    .withMessage('Title is required')
    .isString().withMessage('title should be string')
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage('Length of title is not correct');

const shortDescriptionValidation = body('data.attributes.shortDescription')
    .exists()
    .withMessage('ShortDescription is required')
    .isString()
    .withMessage('ShortDescription should be string')
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('Length of shortDescription is not correct');

const contentValidation = body('data.attributes.content')
    .exists()
    .withMessage('Content is required')
    .isString().withMessage('Content should be string')
    .trim()
    .isLength({min: 1, max: 1000})
    .withMessage('Length of content is not correct');

const blogIdValidation = body('data.attributes.blogId')
    .exists()
    .withMessage('ID is required') // Проверка на наличие
    .isString()
    .withMessage('ID must be a string') // Проверка, что это строка
    .isMongoId()
    .withMessage('Incorrect format of ObjectId')

export const postCreateInputValidation = [
    resourceTypeValidation(ResourceType.Posts),
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
];

export const postUpdateInputValidation = [
    resourceTypeValidation(ResourceType.Posts),
    dataIdMatchValidation,
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation,
];