import Hapi from '@hapi/hapi';
import Mongoose from 'mongoose';
import Jwt from '@hapi/jwt';

import registerUser from './src/handlers/user/registerUser.js';
import loginUser from './src/handlers/user/loginUser.js';
import getUserByLogin from './src/handlers/user/getUserByLogin.js';
import addFriendHandler from './src/handlers/user/addFriendHandler.js';
import deleteFriendHandler from './src/handlers/user/deleteFriendHandler.js';

const hostPort = process.env.HOST_PORT;
const host = process.env.HOST;
const dbUrl = process.env.DB_URL;

const connectDb = async () => {
	try {
		await Mongoose.connect(dbUrl);
		console.log('connected to db of phantoms');
	} catch (error) {
		console.log('Connection failed');
		console.error(error.message);
	}
};

const initDb = async () => {
	const server = new Hapi.Server({
		host,
		port: hostPort,
		routes: {
			cors: true,
		},
	});
	await server.register(Jwt);
	server.auth.strategy('user_jwt_strategy', 'jwt', {
		keys: 'secret',
		verify: {
			aud: 'token',
			iss: 'urn:issuer:test',
			sub: false,
			nbf: true,
			exp: true,
			maxAgeSec: 14400, // 4 hours
			timeSkewSec: 15,
		},
		validate: () => ({
			isValid: true,
			credentials: 'haha',
		}),
	});

	/** ****************************************** */
	/*  ********** User manipulations ************ */
	/** ****************************************** */
	server.route({
		method: 'POST',
		path: '/register',
		handler: registerUser,
	});

	server.route({
		method: 'POST',
		path: '/login',
		handler: loginUser,
	});

	server.route({
		method: 'GET',
		path: '/profile/{login}',
		handler: getUserByLogin,
	});

	server.route({
		method: 'PUT',
		path: '/profile/{login}',
		handler: getUserByLogin,
	});

	server.route({
		method: 'PUT',
		path: '/profile/{login}/addFriend/{_id}',
		handler: addFriendHandler,
	});

	server.route({
		method: 'PUT',
		path: '/profile/{login}/deleteFriend/{_id}',
		handler: deleteFriendHandler,
	});

	await server.start();
	console.log(`server is running on ${server.info.uri}`);
};

const start = async () => {
	await connectDb();
	await initDb();
};

export default start;
