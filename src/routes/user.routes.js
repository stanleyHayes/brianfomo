import {Router} from "express";
import {
    addUser,
    deleteUser,
    deleteUsers,
    getUser,
    getUsers,
    updateUser
} from "../controllers/users/users.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = Router({
    mergeParams: true,
    caseSensitive: true
});

router.get("/", protect, getUsers);
router.post("/", protect, addUser);
router.put("/:id", protect, updateUser);
router.get("/:id", protect, getUser);
router.delete("/", protect, deleteUsers);
router.delete("/:id", protect, deleteUser);

export default router;