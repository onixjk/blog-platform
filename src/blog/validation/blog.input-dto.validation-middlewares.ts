import {body} from "express-validator";

const nameValidation = body('name')
    .exists()
    .isString().withMessage('name should be string')
    .trim()
    .isLength({ max: 15 })
    .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
    .isString().withMessage('Description should be string')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Length of description is not correct');

const websiteUrlValidation = body('websiteUrl')
    .isLength({ max: 100 }).withMessage('Length of email is not correct')
    // .isEmail().withMessage('Email is not correct')
    // .normalizeEmail()
    // .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$   /)
    // .withMessage('Email address should be valid')

export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
];