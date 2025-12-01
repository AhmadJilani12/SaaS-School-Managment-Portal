// /models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
});
export default mongoose.models.User ||
  mongoose.model("User", UserSchema);




