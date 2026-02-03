import httpStatuses from "http-statuses";

import {config} from "../../config/config.js";
import {validateUserLogin, validateUserRegistration} from "../../validators/user.validator.js";
import {userService} from "./../../services/user/user.service.js";
import {authenticationService} from "../../services/authentication/authentication.service.js";
import {USER_ERRORS} from "../../constants/user.errors.js";

/**
 * Register a new user.
 *
 * This controller:
 * - Validates user input (email, full name, password)
 * - Checks for existing user with the same email
 * - Creates a new user record
 * - Generates a JWT authentication token
 * - Sets the token as an HTTP-only cookie
 * - Returns a success response on completion
 *
 *  @returns {400} Validation error
 *  @returns {409} Email already exists
 *  @returns {201} User successfully created
 *  @returns {500} Server error
 *
 * @async
 * @function register
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 *
 * @returns {void} Sends an HTTP response
 *
 * @throws {500} Internal server error if user creation fails
 *
 * @example
 * POST /api/v1/authentication/register
 * {
 *   "full_name": "John Doe",
 *   "email": "john@example.com",
 *   "password": "StrongP@ssw0rd!"
 * }
 */
export const register = async (req, res) => {
    try {
        const {full_name, email, password} = req.body;
        const {is_valid, error} = validateUserRegistration(req.body);
        if (!is_valid) {
            return res.status(httpStatuses.BAD_REQUEST.code).json({
                message: 'Bad request',
                error: error
            });
        }

        const {ok, reason, data} = await userService.createUser({email, full_name, password});
        if (!ok && reason === USER_ERRORS.USER_ALREADY_EXISTS) {
            return res.status(httpStatuses.CONFLICT.code).json({
                message: 'Email already in use'
            });
        }

        res.cookie("jwt", data.token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: config.app.env !== "dev"
        });
        res.status(httpStatuses.CREATED.code).json({
            message: 'User created successfully',
            data: data.user
        });

    } catch (e) {
        console.error(`Error in register controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            message: 'Something went wrong.'
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const {isValid, error} = validateUserLogin({email, password});
        if (!isValid) {
            return res.status(httpStatuses.BAD_REQUEST.code).json({
                'error': error
            });
        }
        const {ok, data, reason} = await authenticationService.login({email, password});
        if (!ok && reason === USER_ERRORS.INVALID_CREDENTIALS) {
            return res.status(httpStatuses.UNAUTHORIZED.code).json({
                error: 'Invalid Credentials',
                data: null
            });
        }
        if (!ok && reason === USER_ERRORS.UNKNOWN_ERROR) {
            return res.status(httpStatuses.BAD_REQUEST.code).json({
                error: 'Something went wrong',
                data: null
            });
        }
        res.cookie("jwt", data.token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: config.app.env !== "dev"
        });
        res.status(httpStatuses.OK.code).json({message: 'User logged in successfully', data: data.user});
    } catch (e) {
        console.log(`Error in login controller: ${e.message}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({message: 'Something went wrong.'})
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(httpStatuses.OK.code).json({message: 'Logged out successfully'});
    } catch (e) {
        console.log(`Error in logout controller: ${e.message}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({message: `Something went wrong: ${e.message}`})
    }
}

/**
 * Update the authenticated user's profile.
 *
 * This controller:
 * - Requires authentication (user must be set on res.locals by authentication middleware)
 * - Allows partial updates to a whitelisted set of fields only
 * - Prevents mass-assignment by rejecting unknown fields
 * - Persists changes to the database
 *
 * Allowed fields:
 * - full_name
 * - profile_image
 *
 * @async
 * @function updateProfile
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 *
 * @returns {400} No updates provided or update not allowed
 * @returns {401} Unauthorized (if authentication middleware blocks request)
 * @returns {200} User profile updated successfully
 * @returns {500} Internal server error
 *
 * @example
 * PATCH /api/v1/authentication/profile
 * {
 *   "full_name": "Jane Doe",
 *   "profile_image": "https://cdn.example.com/avatar.png"
 * }
 */
export const updateProfile = async (req, res) => {
    try {
        const user = res.locals.user;
        const {ok, reason, data} = await userService.updateUser(user._id, req.body, {lean: false, runValidators: true});
        if (!ok) {
            if (reason === USER_ERRORS.UPDATE_NOT_ALLOWED) {
                return res.status(httpStatuses.BAD_REQUEST.code).json({
                    error: "Updates not allowed",
                    data: null
                });
            }
            if (reason === USER_ERRORS.UPDATE_NOT_PROVIDED) {
                return res.status(httpStatuses.BAD_REQUEST.code).json({
                    error: "Update not provided",
                    data: null
                });
            }
            if (reason === USER_ERRORS.UPLOAD_NOT_COMPLETED) {
                return res.status(httpStatuses.BAD_REQUEST.code).json({
                    error: "Error uploading profile image",
                    data: null
                });
            }

            return res.status(httpStatuses.BAD_REQUEST.code).json({
                error: "Something went wrong",
                data: null
            });
        }
        res.status(httpStatuses.OK.code).json({
            message: "User updated successfully",
            data
        });
    } catch (e) {
        console.log(`Error in updateProfile controller: ${e.message}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({message: `Something went wrong: ${e.message}`})
    }
}

export const getProfile = async (req, res) => {
    try {
        const user = res.locals.user;
        return res.status(httpStatuses.OK.code).json({
            message: "Successfully retrieved profile",
            data: user
        })
    } catch (e) {
        console.log(`Error in get profile controller: ${e.message}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({message: `Something went wrong: ${e.message}`})
    }
}