import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String
    },
    images: {
        type: [String],
    },
    read_by: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        read_at: {
            type: Date,
            default: Date.now
        }
    }],
    deleted_for_everyone: {
        type: Boolean,
        default: false
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Chat"
    },
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        }
    }
});

messageSchema.index({
    chat: 1,
    "read_by.user": 1,
    created_at: -1
});

messageSchema.methods.canUpdate = async function () {
}
messageSchema.methods.canDeleteForSelf = async function () {
}
messageSchema.methods.canDeleteForBoth = async function () {
}

const Message = mongoose.model('Message', messageSchema);

export default Message;