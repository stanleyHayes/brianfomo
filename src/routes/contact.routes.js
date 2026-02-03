import {Router} from "express";
import {
    addContact,
    deleteContact,
    deleteContacts,
    getContacts,
    updateContact,
    getContact
} from "../controllers/contacts/contacts.controller.js";

const router = Router({
    mergeParams: true,
    caseSensitive: true
});

router.get("/:id", getContact);
router.get("/", getContacts);
router.delete("/", deleteContacts);
router.delete("/:id", deleteContact);
router.put("/:id", updateContact);
router.post("/", addContact);

export default router;