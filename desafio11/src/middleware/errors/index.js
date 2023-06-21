import { ErrorCodes } from "../../models/CustomError.js";

module.exports = (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case ErrorCodes.INVALID_TYPES_ERROR:
            res.send({ status: 'error', error: error.name })
            break;
        case ErrorCodes.ROUTING_ERROR:
            res.send({ status: 'error', error: 'Routing error' })
            break;
        case ErrorCodes.DATABASE_ERROR:
            res.send({ status: 'error', error: 'Database error' })
            break;
        case ErrorCodes.AUTHENTICATION_ERROR:
            res.send({ status: 'error', error: 'Authentication error' })
            break;
        case ErrorCodes.VALIDATION_ERROR:
            res.send({ status: 'error', error: 'Validation error' })
            break;
        case ErrorCodes.NOT_FOUND_ERROR:
            res.send({ status: 'error', error: 'Not found error' })
            break;
        case ErrorCodes.INTERNAL_ERROR:
            res.send({ status: 'error', error: 'Internal error' })
            break;
        case ErrorCodes.PASSWORDS_DO_NOT_MATCH:
            res.send({ status: 'error', error: 'Passwords do not match error' })
            break;
        case ErrorCodes.USER_NOT_EXIST:
            res.send({ status: 'error', error: 'User not exist error' })
            break;
        default:
            res.send({ status: 'error', error: 'Unhandled error' })
    }
}