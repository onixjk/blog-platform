import { body, param } from 'express-validator';

export const paramIdValidation = (paramName: string) => param(paramName)
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isMongoId()
    .withMessage('Invalid format ObjectId');

export const dataIdMatchValidation = body('data.id')
    .exists()
    .withMessage('ID in body is required')
    .custom((value, { req }) => {
        if (value !== req?.params?.id) {
            throw new Error('ID in URL and body must match');
        }
        return true;
    });