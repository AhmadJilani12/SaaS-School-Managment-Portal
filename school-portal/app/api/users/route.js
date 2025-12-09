import { connectDB } from "../../../lib/db.js";
import User from "../../../models/User";
import Role from "../../../models/Role";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    await connectDB();

    const { name, email, role, password } = await req.json();

    // Validate
    if (!name || !email) {
      return Response.json(
        { success: false, message: "Name & Email are required" },
        { status: 400 }
      );
    }

    // Only custom password for now
    const hashedPassword = await bcrypt.hash(password || "123456", 10);

    // Find role ID
    const selectedRole = await Role.findOne({ name: role });

    if (!selectedRole) {
      return Response.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: [selectedRole._id],
    });

    return Response.json({ success: true, user }, { status: 201 });

  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


