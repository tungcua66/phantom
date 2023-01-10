import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
	login: {
		type: 'String',
		required: [true, 'login is required'],
		match: [/^\w{5,20}$/, 'login not valid: must be string between 5-20 characters'],
		unique: [true, 'login is already taken'],
	},
	password: {
		type: 'String',
		required: [true, 'password is required'],
	},
	role: {
		type: 'String',
		enum: ['Guerrier', 'Alchimiste', 'Sorcier', 'Espions', 'Enchanteur'],
		default: 'Guerrier',
	},
	friends: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: 'User',
	}],
});

userSchema.pre('save', async function save(next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.plugin(uniqueValidator);

export default mongoose.model('User', userSchema);
