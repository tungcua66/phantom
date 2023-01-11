import Boom from '@hapi/boom';
import User from '../../model/User.js';

export default async (request) => {
	try {
		const res = await User.findOne({ login: request.params.login })
			.select({ password: 0, _id: 0 }).select('login role friends');
		return res;
	} catch (error) {
		return Boom.badRequest('login not exist');
	}
};
