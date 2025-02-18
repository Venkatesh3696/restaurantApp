import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Users', UserSchema);
