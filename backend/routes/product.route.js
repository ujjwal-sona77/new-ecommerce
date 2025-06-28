import Product from "../models/product.model.js";
import express from "express";
import { CreateProduct } from "../controllers/create.product.js";
import userModel from "../models/user.model.js";

const router = express.Router();

// Example: POST /products/create
router.post("/create", CreateProduct);

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

router.post("/addtocart/:productid/:email", async (req, res) => {
  try {
    const { productid, email } = req.params;
    const product = await Product.findById(productid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart.push(product._id);
    await user.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product to cart", error: error.message });
  }
});

router.post("/remove/:productid/:email", async (req, res) => {
    try {
        const { productid, email } = req.params;
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.cart.remove(productid);
        await user.save();
        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error removing product from cart", error: error.message });
    }
});


export const productRouter = router;
