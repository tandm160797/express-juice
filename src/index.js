import colors from 'colors';
import compression from 'compression';
import express from 'express';
import path from 'path';
import mongoDB from '$common/mongoDB';
import errorHandler from '$middlewares/errorHandler';
import logger from '$middlewares/logger';
import router from '$src/routes';
import { isDevelopment } from '$utils';

(async () => {
	const app = express();
	const host = process.env.HOST || 'localhost';
	const port = process.env.PORT || 3000;

	app.set('view engine', 'pug');
	app.set('views', path.join(path.resolve(), 'src/resources/views'));

	isDevelopment ? app.use(logger) : null;

	app.use(compression());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.static(path.join(path.resolve(), 'public')));

	router(app);
	await mongoDB.connect();

	app.use(errorHandler);
	app.listen(port, () => {
		isDevelopment
			? console.log(colors.green(`App listening at ${host}:${port}`))
			: console.log(colors.green(`App listening at ${host}`));
	});
})();
