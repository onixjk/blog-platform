import {ValidationError} from "../../blog/types/validationError";

export const createErrorsMessages = (
    errors: ValidationError[]
): { errorsMessages: ValidationError[] } => {
    return {errorsMessages: errors};
}