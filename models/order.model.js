// models/Order.js
import mongoose from 'mongoose';

// Schema for order items
const orderItemSchema = new mongoose.Schema({
	menuItemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Restaurant.menu',
		required: true,
	},
	quantity: { type: Number, required: true },
});

// Schema for orders
const orderSchema = new mongoose.Schema({
	restaurantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Restaurant',
		required: true,
	},
	items: [orderItemSchema],
	customerName: { type: String, required: true },
	customerAddress: { type: String, required: true },
	status: { type: String, default: 'Pending' }, // Could be 'Pending', 'Completed', etc.
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
