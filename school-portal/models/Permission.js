// /models/Permission.js
import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  module: { type: String, required: true },
});

export default mongoose.models.Permission ||
  mongoose.model("Permission", PermissionSchema);
