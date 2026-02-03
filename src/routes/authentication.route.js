import express from "express";
import {getProfile, login, logout, register, updateProfile} from "../controllers/authentication/auth.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router({mergeParams: true, caseSensitive: true});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getProfile);

export default router;