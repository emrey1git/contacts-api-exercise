import express from "express";
import contactsRouter from "./routes/contacts.js";
import db from "./db/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/contacts", contactsRouter);

app.get("/", (req, res) => {
  res.send("Contacts API çalışıyor 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
