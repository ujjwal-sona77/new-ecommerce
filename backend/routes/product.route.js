import Product from "../models/product.model.js";
import express from "express";
import { CreateProduct } from "../controllers/create.product.js";

const router = express.Router();

// Example: POST /products/create
router.post("/create", CreateProduct);

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products});
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

export const productRouter = router;
