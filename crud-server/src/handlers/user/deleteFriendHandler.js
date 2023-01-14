import Boom from '@hapi/boom';
import User from '../../model/User.js';

export default async (request) => {
	try {
		const user = await User.findOne({ login: request.params.login });
		if (!user.friends.includes(request.params._id)) return false;
		const updatedUser = User.findOneAndUpdate(
			{ _id: user._id },
			{ $pull: { friends: request.params._id } },
			{ new: true },
		);
		return updatedUser;
	} catch (error) {
		return Boom.badRequest('this user/friendId does not exist');
	}
};
