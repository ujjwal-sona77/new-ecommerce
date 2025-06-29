import Order from '../models/orders.model.js';
import User from '../models/user.model.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

export const editUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, email, isAdmin } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { username, email, isAdmin }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};
