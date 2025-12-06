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
  .populate("permissions", "name label module description")
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



// for updating existing role
export async function PUT(req) {
  try {
    await connectDB();

    const { roleId, roleName, roleDescription, permissions } = await req.json();

    console.log("🛠️ Role Update Payload:", {
      roleId,
      roleName,
      roleDescription,
      permissions
    });

    if (!roleId) {
      return new Response(JSON.stringify({ error: "Role ID is required" }), {
        status: 400,
      });
    }

    if (!roleName?.trim()) {
      return new Response(JSON.stringify({ error: "Role name is required" }), {
        status: 400,
      });
    }

    // Convert permission names → permission IDs
    const permissionDocs = await Permission.find({
      name: { $in: permissions },
    }).select("_id");

    const permissionIds = permissionDocs.map((p) => p._id);

    // Update role (only if it is not predefined)
    const updatedRole = await Role.findOneAndUpdate(
      { _id: roleId, isPredefined: false },
      {
        name: roleName,
        description: roleDescription || "",
        permissions: permissionIds
      },
      { new: true }
    )
      .populate("permissions", "name label module description")
      .lean();

    if (!updatedRole) {
      return new Response(JSON.stringify({ error: "Role not found or cannot update predefined roles" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        role: updatedRole,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Role Update Error:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
