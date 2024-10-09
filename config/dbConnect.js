import mongoose from 'mongoose';

const connectDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.log('\n🚫 Error! The Error info is below');
		console.log('error in connecting DB', error);
	}
};

export default connectDb;
