import {userService} from "./../user/user.service.js";
import {USER_ERRORS} from "../../constants/user.errors.js";

const login = async ({email, password}) => {
    const {data, reason, ok} = await userService.getUser(
        {email},
        {password: 1, email: 1, full_name: 1}
    );
    if (!ok && reason === USER_ERRORS.INVALID_CREDENTIALS) {
        return {data: null, reason: USER_ERRORS.INVALID_CREDENTIALS}
    }
    if (!ok && reason === USER_ERRORS.USER_NOT_FOUND) {
        return {data: null, reason: USER_ERRORS.INVALID_CREDENTIALS}
    }
    if (!ok) {
        return {data: null, reason: USER_ERRORS.UNKNOWN_ERROR}
    }
    if (data && !await data.comparePassword(password)) {
        return {data: null, reason: USER_ERRORS.INVALID_CREDENTIALS}
    }
    const token = data.generateToken()
    return {
        data: {
            user: data,
            token: token,
            ok: true
        }
    }
}

export const authenticationService = {login};