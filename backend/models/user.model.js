import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
