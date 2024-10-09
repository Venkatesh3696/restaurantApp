import mongoose from 'mongoose';

export const menuItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	availabilityStatus: {
		type: Boolean,
		default: true,
	},
});

export const restaurantSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	menu: [menuItemSchema],
});

export default mongoose.model('Restaurant', restaurantSchema);
