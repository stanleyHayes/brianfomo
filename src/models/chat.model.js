import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    title: {
        type: String
    },
    agenda: {
        type: String
    },
    images: {
        type: [String],
    },
    deleted: {
        sender: {
            type: Boolean,
            default: false
        },
        recipient: {
            type: Boolean,
            default: false
        }
    },
    kind: {
        type: String,
        enum: ['private', 'group'],
        default: 'private'
    }
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            return ret;
        },
        virtuals: true
    },
    toObject: {virtuals: true}
});

chatSchema.virtual('last_message', {
    localField: '_id',
    foreignField: 'chat',
    ref: 'Message',
    justOne: true,
    options: {
        sort: {created_at: -1}
    }
});

chatSchema.index({ participants: 1 });

chatSchema.methods.canUpdate = async function () {
}
chatSchema.methods.canDeleteForSelf = async function () {
}
chatSchema.methods.canDeleteForBoth = async function () {
}

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;