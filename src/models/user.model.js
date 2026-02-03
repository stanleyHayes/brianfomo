import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config/config.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: false,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        lowercase: true
    },
    full_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: true,
        select: false
    },
    profile_image: {
        type: String,
        default: ''
    }
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"},
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
            return ret;
        }
    }
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    if (!this.password) {
        throw new Error("Password not selected on user document");
    }
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jsonwebtoken.sign(
        {
            sub: this._id
        },
        config.app.jwtSecret,
        {
            expiresIn: '30d'
        }
    );
}


const User = mongoose.model('User', userSchema);

export default User;