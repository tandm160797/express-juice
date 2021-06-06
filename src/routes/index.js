import cors from 'cors';
import siteRoute from '$routes/site.route';
import userRoute from '$routes/user.route';
import swagger from '$swaggers';

const router = (app) => {
	app.use(cors());
	app.use('/', siteRoute);
	app.use('/user', userRoute);
	app.use('/api-docs', swagger);
};

export default router;
