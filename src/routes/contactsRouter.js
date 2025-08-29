import express from "express";
import {
  getContact,
  getContactById,
  createContact,
  putContactById,
  patchContactById,
  deleteContact,
} from "../controllers/contactsController.js";

import { authenticate, roleMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /contacts → sadece admin görebilsin
router.get("/", authenticate, roleMiddleware(['admin']), getContact);

// GET /contacts/:id → hem admin hem user görebilsin
router.get("/:id", authenticate, getContactById);

// POST /contacts → admin ekleyebilsin
router.post("/", authenticate, roleMiddleware(['admin']), createContact);

// PUT / PATCH / DELETE → admin sadece yapabilsin
router.put("/:id", authenticate, roleMiddleware(['admin']), putContactById);
router.patch("/:id", authenticate, roleMiddleware(['admin']), patchContactById);
router.delete("/:id", authenticate, roleMiddleware(['admin']), deleteContact);

export default router;
