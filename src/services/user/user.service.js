import {userRepository} from "../../repository/user/user.repository.js";
import {USER_ERRORS} from "../../constants/user.errors.js";
import {uploadImage} from "../../lib/cloudinary.js";

/**
 * Create a new user account.
 *
 * This service:
 * - Checks if a user already exists by email
 * - Persists a new user if the email is not taken
 * - Generates a JWT token for the newly created user
 *
 * This function does NOT:
 * - Handle HTTP responses
 * - Perform request validation
 * - Hash passwords (assumed to be done earlier)
 *
 * @async
 * @function createUser
 *
 * @param {Object} userData - User creation payload
 * @param {string} userData.email - User email address
 * @param {string} userData.full_name - User full name
 * @param {string} userData.password - Hashed user password
 *
 * @returns {Promise<{
 *   ok: boolean,
 *   reason?: "USER_ALREADY_EXISTS",
 *   data: {
 *     token: string,
 *     user: Object
 *   } | null
 * }>}
 *
 * @example
 * const result = await createUser({
 *   email: "john@example.com",
 *   full_name: "John Doe",
 *   passwordHash: "$2b$10$..."
 * });
 *
 * if (!result.ok) {
 *   if (result.reason === "USER_ALREADY_EXISTS") {
 *     // handle conflict
 *   }
 * }
 *
 * // success
 * console.log(result.data.user, result.data.token);
 */
const createUser = async (userData) => {
    const existingUser = await userRepository.getUser({email: userData.email}, {
        password: 1,
        email: 1,
        full_name: 1
    }, {lean: false});
    if (existingUser) {
        return {
            ok: false,
            reason: USER_ERRORS.USER_ALREADY_EXISTS,
            data: null
        }
    }
    const createdUser = await userRepository.createUser(userData);
    const token = createdUser.generateToken();
    return {
        data: {token, user: createdUser},
        ok: true
    }
}

const getUser = async (filter, projection, options) => {
    const user = await userRepository.getUser(filter, projection, options);
    if (!user) {
        return {ok: false, reason: USER_ERRORS.USER_NOT_FOUND, data: null}
    }
    return {ok: true, data: user}
}

/**
 * Persist changes made to an existing user.
 *
 * This service method expects a full Mongoose user document.
 * It delegates persistence to the repository and ensures that
 * schema validations and pre/post save hooks are executed.
 *
 * Use this method when:
 * - You already have a user document (e.g. from authentication middleware)
 * - You have mutated fields directly on the document
 * - You rely on hooks such as password hashing
 *
 * @async
 * @function saveUser
 *
 * @param {import("mongoose").Document} user - Mongoose user document
 *
 * @returns {Promise<{ ok: boolean, data: Object }>}
 *
 * @throws Will propagate repository errors
 */
const saveUser = async (user) => {
    const savedUser = await userRepository.saveUser(user);
    return {ok: true, data: savedUser};
}
/**
 * Update a user's profile using strict business rules.
 *
 * This service method:
 * - Fetches the user as a full Mongoose document
 * - Enforces a whitelist of allowed profile fields
 * - Handles profile image uploads via Cloudinary
 * - Persists changes using document.save() so hooks run
 *
 * This method is intended for USER-INITIATED profile updates
 * (e.g. "update my profile"), not administrative updates.
 *
 * @async
 * @function updateUser
 *
 * @param {string} id - User document ID
 * @param {Object} payload - Profile update payload
 * @param {Object} options - Optional persistence options
 *
 * @returns {Promise<{ ok: boolean, reason?: string, data: Object | null }>}
 */
const updateUser = async (id, payload, options) => {
    const userResult = await getUser(
        {_id: id},
        {password: 0},
        options
    );

    if (!userResult.ok) {
        return {
            ok: false,
            reason: USER_ERRORS.USER_NOT_FOUND,
            data: null
        };
    }

    const user = userResult.data;
    const updates = Object.keys(payload);

    if (updates.length === 0) {
        return {
            ok: false,
            reason: USER_ERRORS.UPDATE_NOT_PROVIDED,
            data: null
        };
    }

    const allowedUpdates = new Set(["full_name", "profile_image"]);

    if (!updates.every(key => allowedUpdates.has(key))) {
        return {
            ok: false,
            reason: USER_ERRORS.UPDATE_NOT_ALLOWED,
            data: null
        };
    }

    for (const key of updates) {
        if (key === "profile_image") {
            try {
                user.profile_image = await uploadImage(payload.profile_image);
            } catch (e) {
                console.log(`Something went wrong: ${e}`);
                return {
                    ok: false,
                    reason: USER_ERRORS.UPLOAD_NOT_COMPLETED,
                    data: null
                };
            }
        } else {
            user[key] = payload[key];
        }
    }

    const savedUser = await userRepository.saveUser(user);

    return {
        ok: true,
        data: savedUser.toJSON()
    };
};

export const userService = {
    createUser,
    getUser,
    saveUser,
    updateUser
};