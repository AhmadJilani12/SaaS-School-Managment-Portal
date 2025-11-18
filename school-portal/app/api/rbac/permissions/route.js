import mongoose from "mongoose";
import Permission from "../../../../models/Permission";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

// DB connection helper
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, { dbName: DATABASE_NAME });
    console.log("📌 Connected to MongoDB");
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const permissions = await Permission.find({}).lean();

    const grouped = permissions.reduce((acc, perm) => {
      if (!acc[perm.module]) acc[perm.module] = [];
      acc[perm.module].push({ name: perm.name, label: perm.label });
      return acc;
    }, {});

    return new Response(JSON.stringify({ permissions: grouped }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
