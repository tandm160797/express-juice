import { Router } from 'express';
import userModule from './../modules/user/user.module.js';

const siteRoute = Router();
siteRoute.post('/', userModule.create);

export default siteRoute;
