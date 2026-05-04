import {body} from "express-validator";
import {ResourceType} from "../../../core/types/resource-type";
import {resourceTypeValidation} from "../../../core/middlewares/validation/resource-type.validation-middleware";
import {dataIdMatchValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";

const nameValidation = body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name should be string')
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
    .isString().withMessage('Description should be string')
    .trim()
    .isLength({min:1, max: 500 })
    .withMessage('Length of description is not correct');

const websiteUrlValidation = body('websiteUrl')
    .trim()
    .isLength({min:1, max: 100 }).withMessage('Length of URL is not correct')
    .isURL().withMessage('URL is required')
    .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Invalid URL format, must match the pattern');

export const blogCreateInputValidation = [
    resourceTypeValidation(ResourceType.Blogs),
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
];

export const blogUpdateInputValidation = [
    resourceTypeValidation(ResourceType.Blogs),
    dataIdMatchValidation,
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
];