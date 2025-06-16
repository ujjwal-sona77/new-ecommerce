import Order from "../models/orders.model.js";
import userModel from "../models/user.model.js";
export const createOrder = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    const order = await Order.create({
      products: user.cart,
      user: user._id,
      address: req.body.address,
      contactno: req.body.contactno,
      paymentMethod: req.body.paymentMethod,
      fullname: req.body.fullname,
      city: req.body.city,
      postalcode: req.body.postalcode,
    });
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
