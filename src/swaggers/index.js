import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { isDevelopment } from '$utils';

const servers = isDevelopment ? [`${process.env.HOST}:${process.env.PORT}`] : [`${process.env.HOST}`];

const options = {
	swaggerDefinition: {
		info: {
			openapi: '3.0.0',
			version: '1.0.0',
			title: 'Library API',
			description: 'Swagger UI for NodeJS Tech',
			contact: {
				name: 'TanDM'
			},
			servers
		}
	},
	apis: [path.join(path.resolve(), 'src/swaggers/*.yml')]
};

const swaggerDocs = swaggerJsDoc(options);
const swagger = [swaggerUI.serve, swaggerUI.setup(swaggerDocs)];

export default swagger;
