import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }

  if (!MONGODB_URI) {
    throw new Error("❌ Missing MONGODB_URI in env");
  }

  await mongoose.connect(MONGODB_URI, { dbName: DATABASE_NAME });
  console.log("📌 MongoDB Connected");
}
