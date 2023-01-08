import Hapi from '@hapi/hapi';
import Mongoose from 'mongoose';
import Jwt from '@hapi/jwt';

import registerUser from './src/handlers/user/registerUser';
import loginUser from './src/handlers/user/loginUser';

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

	await server.start();
	console.log(`server is running on ${server.info.uri}`);
};

const start = async () => {
	await connectDb();
	await initDb();
};

export default start;
