import express from "express";
import { getContact, getContactById, createContact, putContactById, patchContactById, deleteContact } from "../controllers/contactsController.js";

const router = express.Router();

router.get("/", getContact);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id",putContactById);
router.patch("/:id", patchContactById);
router.delete("/:id", deleteContact);

export default router;
