import Boom from '@hapi/boom';
import User from '../../model/User.js';

export default async (request) => {
	try {
		const res = await User.findOne({ login: request.params.login })
			.select('login role friends -_id')
			.populate({ path: 'friends', select: '-_id login role' });
		return res;
	} catch (error) {
		return Boom.badRequest('login not exist');
	}
};
