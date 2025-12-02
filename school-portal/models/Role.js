// /models/Role.js
import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description:{type:String , required:false },
  isPredefined: { type: Boolean, default: false }, 
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

export default mongoose.models.Role ||
  mongoose.model("Role", RoleSchema);
