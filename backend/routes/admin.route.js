import express from "express";
const router = express.Router();
import User from "../models/user.model.js";

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the admin dashboard",
    success: true,
  });
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user's admin status by email
router.patch("/users/:email/admin", async (req, res) => {
    const { email } = req.params;
    const { makeAdmin } = req.body; // expects { makeAdmin: true/false }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.admin = !!makeAdmin;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User admin status updated to ${user.admin}`,
            user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
export { router as adminRouter };
