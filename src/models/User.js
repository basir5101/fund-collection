// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "moderator", "user"],
      default: "moderator",
    },
  },
  { timestamps: true },
);

// Check if the model already exists to prevent re-compilation in development
export default mongoose.models.User || mongoose.model("User", UserSchema);
