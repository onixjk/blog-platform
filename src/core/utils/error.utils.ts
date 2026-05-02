import {ValidationErrorType} from "../types/validationError";

export const createErrorsMessages = (
    errors: ValidationErrorType[]
): { errorsMessages: ValidationErrorType[] } => {
    return {errorsMessages: errors};
}