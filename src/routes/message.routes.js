import {Router} from "express";
import {
    addMessage,
    deleteMessage,
    deleteMessages,
    getMessage,
    getMessages,
    updateMessage
} from "../controllers/messages/messages.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = Router({
    mergeParams: true,
    caseSensitive: true
});

router.get("/:id", protect, getMessage);
router.get("/", protect, getMessages);
router.delete("/", protect, deleteMessages);
router.delete("/:id", protect, deleteMessage);
router.put("/:id", protect, updateMessage);
router.post("/", protect, addMessage);

export default router;