import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB bağlantısı başarılı!");
  } catch (err) {
    console.error("MongoDB bağlantı hatası:", err);
    process.exit(1); // Hata olursa server kapansın
  }
};

export default connectDB;
