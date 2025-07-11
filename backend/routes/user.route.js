import express from "express";
import { createUser } from "../controllers/create.user.js";
import { loginUser } from "../controllers/login.user.js";
import User from "../models/user.model.js";
import { auth } from "../middleware/auth.js";
import { editUser } from "../controllers/Edit.user.js";
import { getAllUsers, editUserByAdmin } from '../controllers/admin.order.js';

const router = express.Router();

// Example: GET /users
router.post("/create", createUser);

// Example: GET /users/:id
router.post("/login", loginUser);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

router.post("/edit/:email", auth, editUser);

router.post("/delete", async (req, res) => {

    
  const { email } = req.body;
  try {
    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

router.get("/getUser/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

// Admin routes
router.get('/admin/users', getAllUsers);
router.put('/admin/user/:id', editUserByAdmin);

// Example: POST /users
export const userRouter = router;
