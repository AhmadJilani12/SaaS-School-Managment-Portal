import { connectDB } from "../../../../lib/db.js";
import Role from "../../../../models/Role";
import Permission from "../../../../models/Permission";

//for creating new role
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
      isPredefined: false,
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


//for getting all roles where isPredefined is false (custom roles)
export async function GET(req) {
  try {
    await connectDB();

    // Fetch roles where isPredefined = false
    const roles = await Role.find({ isPredefined: false })
      .populate("permissions", "name description") // populate permissions with only name & description
      .lean();

    return new Response(
      JSON.stringify({ success: true, roles }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Fetch Roles Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
