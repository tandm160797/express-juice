import { Router } from 'express';
import siteModule from './../modules/site/site.module.js';

const siteRoute = Router();
siteRoute.get('/', siteModule.index);

export default siteRoute;
