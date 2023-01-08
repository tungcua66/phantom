import bcrypt from 'bcryptjs';
import Boom from '@hapi/boom';
import createToken from '../../helpers/createToken';
import User from '../../model/User';

export default async (request) => {
	try {
		const loginExists = await User.exists({ login: request.payload.login });
		if (loginExists) {
			const user = await User.findOne({ login: request.payload.login });
			const isValid = await bcrypt.compare(request.payload.password, user.password);
			if (isValid) {
				return { login: user.login, token: createToken() };
			}
		}
		return Boom.badRequest('login/password incorrect');
	} catch (error) {
		return error.message;
	}
};
