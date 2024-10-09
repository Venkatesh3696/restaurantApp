import Order from '../models/order.model.js';
import Restaurant from '../models/restaurant.model.js';

export const createOrder = async (req, res) => {
	try {
		const { restaurantId, items, customerName, customerAddress } = req.body;

		const newOrder = new Order({
			restaurantId,
			items,
			customerName,
			customerAddress,
		});

		await newOrder.save();

		res.status(201).json({
			message: 'Order created successfully',
			order: newOrder,
		});
	} catch (error) {
		res.status(500).json({ message: 'Error creating order', error });
	}
};

export const getOrdersForRestaurant = async (req, res) => {
	try {
		const { restaurantId } = req.params;
		const orders = await Order.find({ restaurantId }).populate(
			'items.menuItemId',
		);

		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving orders', error });
	}
};

export const getOrdersForCustomer = async (req, res) => {
	try {
		const { customerName } = req.params;
		const orders = await Order.find({ customerName }).populate(
			'items.menuItemId',
		);

		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ message: 'Error retrieving orders', error });
	}
};
