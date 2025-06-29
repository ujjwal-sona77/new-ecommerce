import Order from "../models/orders.model.js";
import userModel from "../models/user.model.js";

export const createOrder = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.cart || user.cart.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Ensure user.cart is an array of product IDs
    const productIds = user.cart.map((item) => (item._id ? item._id : item));

    const order = await Order.create({
      products: productIds,
      user: user._id,
      address: req.body.address,
      contactno: req.body.contactno,
      paymentMethod: req.body.paymentMethod,
      fullname: req.body.fullname,
      city: req.body.city,
      postalcode: req.body.postalcode,
    });
    if (!user.orders) user.orders = [];
    user.orders.push(order._id);
    user.cart = [];
    await user.save();
    res
      .status(200)
      .send({ message: "Order created successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};
