import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import upload from "../config/multer.config.js";
export const editUser = [
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found", success: false });
      }
      if (req.file) {
        user.profilePic = req.file.buffer.toString("base64"); // Store as base64 string
      }
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      await user.save();
      let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      res
        .status(200)
        .send({ message: "Profile updated successfully", success: true, token });
    } catch (err) {
      res.status(500).send({ message: err.message, success: false });
    }
  },
];
