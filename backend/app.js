import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
import { userRouter } from "./routes/user.route.js";
import { productRouter } from "./routes/product.route.js";
import { orderRouter } from "./routes/order.route.js"; 
import { adminRouter } from "./routes/admin.route.js";
app.use(
  cors({
    //    origin: "http://localhost:5173", 
    origin: "https://new-ecommerce-drab.vercel.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/product", productRouter); // Assuming you have a product router, replace with actual product router
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use(morgan("dev"));
export default app;
