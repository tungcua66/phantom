import Hapi from '@hapi/hapi';
import Mongoose from 'mongoose';
import Jwt from '@hapi/jwt';

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

	await server.start();
	console.log(`server is running on ${server.info.uri}`);
};

const start = async () => {
	await connectDb();
	await initDb();
};

export default start;
