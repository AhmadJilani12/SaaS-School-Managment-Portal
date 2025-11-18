const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  label: { type: String, required: true },
  module: { type: String, required: true },
});

// CommonJS export
module.exports = mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);
