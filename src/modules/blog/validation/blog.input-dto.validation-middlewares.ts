import {body} from "express-validator";

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

// const createdAt = body('createdAt')
//     .exists().withMessage('createdAt is required')
    // .isISO8601().withMessage('createdAt is required')
    // .toDate().withMessage('createdAt is required');

// const isMembership = body('isMembership')
//     .isBoolean().withMessage('isMembership is required')



export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
    // createdAt,
    // isMembership,
];