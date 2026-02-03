import httpStatuses from "http-statuses";
import jwt from "jsonwebtoken";
import {userService} from "../services/user/user.service.js";
import {config} from "../config/config.js";

/**
 * Authentication middleware to protect routes using a JWT stored in cookies.
 *
 * Expects a signed JWT to be present in the request cookies under:
 *   req.cookies.jwt
 *
 * Verifies the JWT signature and expiration, fetches the associated user,
 * and attaches the user object to res.locals.user for downstream handlers.
 *
 * Requires `cookie-parser` middleware to be registered before this middleware.
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 *
 * @returns {void}
 */
export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(httpStatuses.UNAUTHORIZED.code).json({
                error: 'Unauthorized',
                data: null
            });
        }
        const payload = jwt.verify(token, config.app.jwtSecret);
        const user = await userService.getUser({_id: payload.sub}, {password: 0});
        if(!user){
            return res.status(httpStatuses.UNAUTHORIZED.code).json({
                error: 'Unauthorized',
                data: null
            });
        }
        res.locals.user = user.data;
        next();
    }catch (e) {
        console.error(`Error in auth middleware: ${e}`);
        return res.status(httpStatuses.UNAUTHORIZED.code).json({
            error: "Unauthorized",
            data: null
        });
    }
}