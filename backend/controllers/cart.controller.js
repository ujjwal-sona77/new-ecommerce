import User from '../models/user.model.js';

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const existingCartItem = user.cart.find(item => 
            item.product.toString() === productId
        );

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }

        await user.save();
        
        // Populate cart items with product details
        const populatedUser = await User.findById(userId).populate('cart.product');

        res.status(200).json({
            success: true,
            cart: populatedUser.cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        res.status(200).json({
            success: true,
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
