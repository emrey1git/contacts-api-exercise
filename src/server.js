import express from "express";
import dotenv from "dotenv";

// Config
dotenv.config();
console.log("MONGODB_URL:", process.env.MONGODB_URL);

// DB connection
import db from "./db/db.js";
db(); 

// Routers
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRoutes.js";
import { authenticate } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

// Validator
import {
  registerUserSchema,
  loginUserSchema,
} from "./validators/userValidator.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware

app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/auth", authRouter);
app.use("/contacts", contactsRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Contacts API çalışıyor 🚀");
});

// Server başlat
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
