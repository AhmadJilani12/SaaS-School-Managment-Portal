// imort statement
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, unique: true, required: true },
  password:  { type: String, required: true },

  roles: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
  ],

  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);





