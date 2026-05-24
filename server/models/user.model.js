import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    credits: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true },
);

const User = mongoose.Model("User", userSchema);

export default User;
