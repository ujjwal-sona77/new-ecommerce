import Product from "../models/product.model.js";

export const CreateProduct = async (req, res) => {
    try {
        const { name, price, discount, description, image } = req.body;
        
        if (!image) {
            return res.status(400).json({ 
                message: "Image is required", 
                success: false 
            });
        }

        // Check image size (assuming image is a base64 string)
        const sizeInBytes = Buffer.from(image.split(',')[1], 'base64').length;
        const sizeInMB = sizeInBytes / (1024 * 1024);
        
        if (sizeInMB > 10) {
            return res.status(400).json({
                message: "Image size should not exceed 10MB",
                success: false
            });
        }

        const product = await Product.create({
            name,
            price,
            discount,
            description,
            image
        });

        res.status(200).json({ 
            message: "Product created successfully", 
            success: true, 
            product 
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message, 
            success: false 
        });
    }
};
