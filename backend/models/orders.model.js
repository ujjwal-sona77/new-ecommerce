import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Product"
    }],
    status: {
     type: String,
     default: "pending"
    },
    createdAt: {
     type: Date,
     default: Date.now,
    },
    user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
    },
    address: {
     type: String,
     required: true
    },
    contactno: {
     type: Number,
     required: true
    },
    paymentMethod: {
     type: String,
     required: true
    },
    fullname: {
     type: String,
     required: true
    },
    city: {
     type: String,
     required: true
    },
    postalcode: {
     type: Number,
     required: true
    }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
