import httpStatuses from "http-statuses";
import ChatParticipant from "../../models/chat-participant.model.js";
import Message from "../../models/message.model.js";

export const getChats = async (req, res) => {
    try {
        const user = res.locals.user;
        const chatParticipants = await ChatParticipant.find({
            user: user._id
        }).populate({path: "chat"}).populate({path: "last_message"}).populate({path: "user"});

        res.status(httpStatuses.OK.code).json({
            message: `Chats retrieved successfully`,
            data: chatParticipants
        });
    } catch (e) {
        console.error(`Error in getChats controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteChats = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Chats deleted successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in deleteChats controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const getChat = async (req, res) => {
    try {
        const user = res.locals.user;
        const {id} = req.params;

        const otherParticipant = await ChatParticipant.find({
            chat: id,
            $ne: {"user": user._id}
        }).populate({path: "user"});
        if (!chat) {
            return res.status(httpStatuses.NOT_FOUND).json({
                data: null,
                message: `No chat associated with user ${user._id}`
            });
        }
        const chat = await Chat.findById(id);
        const messages = await Message.find({
            chat: id
        }).populate({path});
        res.status(httpStatuses.OK.code).json({
            message: `Chat retrieved successfully`,
            data: {
                chat: chat,
                participant: otherParticipant,
                messages
            }
        })
    } catch (e) {
        console.error(`Error in getChat controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const addChat = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Chat added successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in addChat controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const deleteChat = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Chat delete successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in deleteChat controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}

export const updateChat = async (req, res) => {
    try {
        res.status(httpStatuses.OK.code).json({
            message: `Chat updated successfully`,
            data: null
        })
    } catch (e) {
        console.error(`Error in updateChat controller: ${e}`);
        res.status(httpStatuses.INTERNAL_SERVER_ERROR.code).json({
            error: `Something went wrong: ${e.message}`
        });
    }
}