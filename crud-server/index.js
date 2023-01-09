import dotenv from 'dotenv';

(async () => {
	dotenv.config();

	// eslint-disable-next-line import/extensions
	const start = (await import('./server.js')).default;
	start();
})();
