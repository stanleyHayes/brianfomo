import {Router} from "express";
import {
    addChat,
    deleteChat,
    deleteChats,
    getChat,
    getChats,
    updateChat
} from "../controllers/chats/chats.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = Router({
    mergeParams: true,
    caseSensitive: true
});

router.get("/:id", getChat);
router.get("/",protect, getChats);
router.delete("/", deleteChats);
router.delete("/:id", deleteChat);
router.put("/:id", updateChat);
router.post("/", addChat);

export default router;