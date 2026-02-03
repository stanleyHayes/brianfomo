import User from "../../models/user.model.js";

/**
 * Find a user by email.
 *
 * @param {Object} filter
 * @param {Object} projection
 * @param {Object} options
 * @returns {Promise<Object|null>}
 * @throws Will throw if database access fails
 */
const getUser = async (
    filter,
    projection,
    options
) => {
    return User.findOne(filter, projection, options).select('+password');
}

/**
 * Create and persist a new user.
 *
 * @param {Object} userData
 * @param {string} userData.email
 * @param {string} userData.full_name
 * @param {string} userData.password
 *
 * @returns {Promise<import("mongoose").Document>}
 * @throws Will throw if database write fails
 */
const createUser = async (userData) => {
    const user = new User({
        email: userData.email,
        full_name: userData.full_name,
        password: userData.password
    });
    return user.save()
}


/**
 * Persist changes made to an existing user document.
 *
 * This helper expects a full Mongoose document instance.
 * It will trigger schema validations and pre/post save hooks.
 *
 * @async
 * @function saveUser
 *
 * @param {import("mongoose").Document} user - Mongoose user document
 *
 * @returns {Promise<import("mongoose").Document>} The saved user document
 *
 * @throws Will throw if validation or database write fails
 */
const saveUser = async (user) => {
    return user.save();
}

/**
 * Update a user by ID using a direct database operation.
 *
 * This performs a MongoDB update and DOES NOT:
 * - Run schema pre-save hooks
 * - Trigger password hashing
 * - Return a full document by default
 *
 * Use `saveUser` instead if you already have a document instance
 * or need hooks and validation to run.
 *
 * @async
 * @function updateUser
 *
 * @param {string} id - User document ID
 * @param {Object} update - Fields to update
 * @param {Object} options - options
 *
 * @returns {Promise<import("mongoose").Document|null>} Updated user or null if not found
 *
 * @throws Will throw if database update fails
 */
const updateUser = async (id, update, options) => {
    return User.findByIdAndUpdate(id, update, options);
}

export const userRepository = {createUser, getUser, updateUser, saveUser};