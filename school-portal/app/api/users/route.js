import { connectDB } from "../../../lib/db.js";
import User from "../../../models/User";
import Role from "../../../models/Role";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    await connectDB();
const { firstName, lastName, email, role, password, isActive } = await req.json();

const fName = firstName?.trim();
const lName = lastName?.trim();
const mail = email?.trim();

if (!fName || !lName || !mail) {
  return Response.json(
    { success: false, message: "Name & Email are required" },
    { status: 400 }
  );
}
    if(role === undefined)
{


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
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roles: [selectedRole._id],
      isActive : isActive !== undefined ? isActive : true,
    });

    return Response.json({ success: true, user }, { status: 201 });

  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


//get users route 

export async function GET() {
  try {
    await connectDB();

    const users = await User.find()
      .populate("roles", "name") // sirf role ka name
      .select("-password")       // password hide
      .lean();

    return Response.json(
      { success: true, users },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

