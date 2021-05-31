import cors from 'cors';
import siteRoute from './site.route.js';
import userRoute from './user.route.js';
import swagger from './../swaggers/swagger.js';

const router = (app) => {
	app.use(cors());
	app.use('/', siteRoute);
	app.use('/user', userRoute);
	app.use('/api-docs', swagger);
};

export default router;
