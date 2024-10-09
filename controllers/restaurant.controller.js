import Restaurant from '../models/restaurant.model.js';

export const createRestaurant = async (req, res) => {
	try {
		const newRestaurant = new Restaurant(req.body);
		await newRestaurant.save();
		res.status(201).json(newRestaurant);
	} catch (error) {
		res.status(500).json({ message: 'Error creating restaurant', error });
	}
};

export const updateRestaurant = async (req, res) => {
	console.log(req.params.restaurantId);

	try {
		const updatedRestaurant = await Restaurant.findByIdAndUpdate(
			req.params.restaurantId,
			req.body,
			{ new: true },
		);
		if (!updatedRestaurant) {
			return res.status(404).json({ message: 'Restaurant not found' });
		}
		res.status(200).json(updatedRestaurant);
	} catch (error) {
		res.status(500).json({ message: 'Error updating restaurant', error });
	}
};

export const getRestaurantDetails = async (req, res) => {
	try {
		const restaurants = await Restaurant.findById(req.params.restaurantId);
		res.status(200).json(restaurants);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching restaurants', error });
	}
};

export const getAllRestaurants = async (req, res) => {
	try {
		const restaurants = await Restaurant.find();
		res.status(200).json(restaurants);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching restaurants', error });
	}
};

export const getAllRestaurantsDetails = () => {};
export const getRestaurantMenu = () => {};

// --- Menu Item Operations ---

// Add a new menu item to a restaurant's menu
export const addMenuItem = async (req, res) => {
	try {
		const { restaurantId } = req.params;
		const newItem = req.body;
		console.log({ restaurantId, newItem });

		await Restaurant.findByIdAndUpdate(restaurantId, {
			$push: { menu: newItem },
		});
		res.status(200).json({ message: 'Menu item added successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error adding menu item', error });
	}
};

export const updateMenuItem = async (req, res) => {
	try {
		const { restaurantId, itemId } = req.params;
		const updatedFields = req.body;

		const menuItem = await Restaurant.findOne({
			_id: restaurantId,
			'menu._id': itemId,
		});

		console.log({ menuItem });

		// Object.keys(updatedFields).forEach((key) => {
		// 	menuItem[`menu.$.${key}`] = updatedFields[key];
		// });

		// await menuItem.save();
		const updatedRestaurant = await Restaurant.findOneAndUpdate(
			{ _id: restaurantId, 'menu._id': itemId }, // Match restaurant and menu item
			{ $set: updateQuery }, // Use $set to update only the provided fields
			{ new: true }, // Return the updated document
		);

		res.status(200).json({ message: 'Menu item updated successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error updating menu item', error });
	}
};

export const removeMenuItem = async (req, res) => {
	try {
		const { restaurantId, itemId } = req.params;

		await Restaurant.findByIdAndUpdate(restaurantId, {
			$pull: { menu: { _id: itemId } },
		});
		res.status(200).json({ message: 'Menu item removed successfully' });
	} catch (error) {
		res.status(500).json({ message: 'Error removing menu item', error });
	}
};
