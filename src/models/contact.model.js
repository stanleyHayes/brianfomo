import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       ref: 'User'
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
       ref: 'User'
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

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;