import {ValidationError} from "../../validation/types/validationError";

export const createErrorsMessages = (
    errors: ValidationError[]
): { errorsMessages: ValidationError[] } => {
    return {errorsMessages: errors};
}