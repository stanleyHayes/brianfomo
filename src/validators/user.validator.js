import validator from "validator";

/**
 * Validate user registration payload.
 *
 * This function performs:
 * - Required field checks
 * - Email format validation
 * - Password strength validation
 *
 * It does NOT:
 * - Create users
 * - Hash passwords
 * - Interact with the database
 *
 * @function validateUserRegistration
 *
 * @param {Object} user - User registration payload
 * @param {string} user.email - User email address
 * @param {string} user.full_name - User full name
 * @param {string} user.password - User plain-text password
 *
 * @returns {{
 *   is_valid: boolean,
 *   error: {
 *     required: Record<string, string>,
 *     validator: Record<string, string>
 *   }
 * }}
 *
 * @example
 * const { is_valid, error } = validateUserRegistration({
 *   email: "john@example.com",
 *   full_name: "John Doe",
 *   password: "StrongP@ssw0rd!"
 * });
 *
 * if (!is_valid) {
 *   console.log(error);
 * }
 */
export const validateUserRegistration = (user) => {
    const error = {
        required: {},
        validator: {}
    };
    if (!user.email) {
        error.required.email = "email is required";
    }
    if (!user.full_name) {
        error.required.full_name = "full name is required";
    }

    if (!user.password) {
        error.required.password = "password is required";
    }

    if (user.email && !validator.isEmail(user.email)) {
        error.validator.email = "invalid email";
    }

    if (user.password && !validator.isStrongPassword(user.password)) {
        error.validator.password = "weak password";
    }
    return {
        is_valid: Object.keys(error.required).length === 0 &&
            Object.keys(error.validator).length === 0
        , error
    };
}


export const validateUserLogin = (user) => {
    const error = {
        required: {},
        validator: {}
    }
    if(!user.email){
        error.required.email = 'Email is required';
    }
    if(!user.password){
        error.required.password = 'Password is required';
    }
    if(user.email && !validator.isEmail(user.email)){
        error.validator.email = 'Invalid email';
    }
    if(user.password && !validator.isStrongPassword(user.password)){
        error.validator.password = 'Weak password';
    }
    return {
        isValid: Object.keys(error.validator).length === 0 &&
            Object.keys(error.required).length === 0,
        error
    }
}