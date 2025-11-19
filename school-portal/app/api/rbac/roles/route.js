import mongoose from "mongoose";
import Role from "../../../../models/Role";
import Permission from "../../../../models/Permission";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI, { dbName: DATABASE_NAME });
    console.log("📌 Connected to MongoDB (Roles API)");
  }
}

export async function POST(req) {
  try {
    await connectDB();
    
    const { roleName, roleDescription, permissions } = await req.json();
      console.log("🛠️ Role Create Payload:", { roleName, roleDescription, permissions });

    if (!roleName) {
      return new Response(JSON.stringify({ error: "Role name is required" }), {
        status: 400,
      });
    }

    const permissionDocs = await Permission.find({
      name: { $in: permissions }
    }).select("_id");

    const permissionIds = permissionDocs.map((p) => p._id);

    const newRole = await Role.create({
      name: roleName,
      description: roleDescription || "",
      permissions: permissionIds,
    });

    return new Response(
      JSON.stringify({
        success: true,
        role: newRole.toObject(),  // ✅ FIX: pure JSON object
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Role Create Error:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
