import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], required: true },
  username: { type: String, unique: true, default: function() {
    return this.name.toLowerCase().replace(/\s+/g, '') + Date.now();
  } }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
