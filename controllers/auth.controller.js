import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/users.model.js';

export const authController = {
	register: async (req, res) => {
		const { name, email, password } = req.body;

		const existingUser = await Users.findOne({ email });

		console.log({ existingUser });

		if (!existingUser) {
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = new Users({
				name,
				email,
				password: hashedPassword,
			});

			await user.save();
		} else {
			return res
				.status(403)
				.send({ message: 'email already registered' });
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body;

		const user = await Users.findOne({ email });
		if (!user) {
			return res.status(404).send({ message: 'User Not Found' });
		}
		// console.log({ user });
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(401).send({ message: 'Invalid Password' });
		}

		const token = await jwt.sign(
			{ payload: user },
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			},
		);
		return res.send({ token, message: 'logged in successfully' });
	},
};
