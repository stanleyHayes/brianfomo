import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authentication.route.js";
import messageRoutes from "./routes/message.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import {config} from "./config/config.js";

const app = express();
app.use(express.json());
app.use(cookieParser(config.app.cookieSecret));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
}))

app.use('/api/v1/authentication', authRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/chats', chatRoutes);

export {app};