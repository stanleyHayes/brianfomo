import mongoose from "mongoose";

const chatParticipant = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

const ChatParticipant = mongoose.model('ChatParticipant', chatParticipant);

export default ChatParticipant;