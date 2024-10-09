import jwt from 'jsonwebtoken';

export const requireSignIn = async (req, res, next) => {
	try {
		const decoded = await jwt.verify(
			req.headers.authorization,
			process.env.jwt_SECRET,
		);
		console.log({ decoded });
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
	}
};
