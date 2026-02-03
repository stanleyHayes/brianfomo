import dotenv from "dotenv";

dotenv.config();

export const config = {
    app: {
        name: process.env.APP_NAME,
        version: process.env.APP_VERSION,
        env: process.env.APP_ENV,
        jwtSecret: process.env.APP_JWT_SECRET,
        cookieSecret: process.env.APP_COOKIE_SECRET,
    },
    server: {
        port: Number.parseInt(process.env.PORT, 10),
        host: process.env.SERVER_HOST,
        keepAliveTimeout: Number.parseInt(process.env.SERVER_KEEP_ALIVE_TIMEOUT, 10),
        headersTimeout: Number.parseInt(process.env.SERVER_HEADERS_TIMEOUT, 10),
        requestTimeout: Number.parseInt(process.env.SERVER_REQUEST_TIMEOUT, 10),
    },
    database: {
        uri: process.env.DATABASE_URI
    },
    cloudinary: {
        url: process.env.CLOUDINARY_URL,
        name: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET
    }
}