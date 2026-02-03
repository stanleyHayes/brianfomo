/**
 * User domain error reasons.
 * These values are used across services and controllers
 * to communicate expected business failures.
 */
export const USER_ERRORS = Object.freeze({
    USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    UPDATE_NOT_ALLOWED: "UPDATE_NOT_ALLOWED",
    UPDATE_NOT_PROVIDED: "UPDATE_NOT_PROVIDED",
    UPLOAD_NOT_COMPLETED: "UPLOAD_NOT_COMPLETED",
});