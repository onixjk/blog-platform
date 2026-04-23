import {body} from "express-validator";

const nameValidation = body('name')
    .isString().withMessage('name should be string')
    .trim()
    .isLength({ max: 15 })
    .withMessage('Length of name is not correct');

const descriptionValidation = body('name')
    .isString().withMessage('name should be string')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Length of name is not correct');

const websiteUrlValidation = body('name')
    .isLength({ max: 100 }).withMessage('Length of email is not correct')
    .isEmail().withMessage('Email is not correct')
    .normalizeEmail()
    .matches(/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
    .withMessage('Email address should be valid')

export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation
];