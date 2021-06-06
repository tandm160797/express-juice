import { Router } from 'express';
import siteModule from '$src/modules/site';

const siteRoute = Router();
siteRoute.get('/', siteModule.index);

export default siteRoute;
