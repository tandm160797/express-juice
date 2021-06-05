import { Router } from 'express';
import userModule from '$src/modules/user/index.';

const siteRoute = Router();
siteRoute.post('/', userModule.create);

export default siteRoute;
