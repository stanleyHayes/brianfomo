import httpStatuses from "http-statuses";

import Message from "../../models/message.model.js";
import {uploadImages} from "../../lib/cloudinary.js";
import ChatParticipant from "../../models/chat-participant.model.js";

export const getMessages = async (req, res) => {
    try {
        const user = res.locals.user;
        const chatParticipants = await ChatParticipant.find({
            user: user._id
        }).select("chat");
        const chatIDs = chatParticipants.map(participant => participant.chat);

        const messages = await Message.find({
            chat: {$in: chatIDs},
            delete_for_everyone: false
        }).populate({
            path: "sender",
            select: "_id full_name username profile_mage"
        }).sort({created_at: -1});

        res.status(httpStatuses.OK.code).json({
            message: `Messages retrieved successfully`,
            data: {messages}
        });
    } catch (e) {
        console.error(`Error in getMessages controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteMessages = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Messages deleted successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in deleteMessages controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const getMessage = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Message retrieved successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in getMessage controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const addMessage = async (req, res) => {
    try {
        const {text, chat} = req.body;
        const {images} = req.files;
        const sender = res.locals.user;
        if (!text && images.length === 0) {
            return res.status(httpStatuses.BAD_REQUEST.code).json({
                error: "Message should contain either text or media",
                data: null
            });
        }
        let urls;
        if (images.length > 0) {
            const paths = images.map(image => image.path);
            urls = await uploadImages(paths);
        }
        const message = new Message({
            sender: sender._id,
            text: text || undefined,
            chat: chat,
            images: urls || undefined
        });

        await message.save();
        res.status(httpStatuses.OK.code).json({
            message: `Message added successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in addMessage controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Message delete successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in deleteMessage controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const updateMessage = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Message updated successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in updateMessage controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}