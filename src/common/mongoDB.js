import colors from 'colors';
import Mongoose from 'mongoose';
import { isDevelopment } from './../utils/index.js';

const mongoDB = {
	connect: async () => {
		try {
			const user = process.env.MONGODB_USER || 'root';
			const password = process.env.MONGODB_PASSWORD || 'root';
			const database = process.env.MONGODB_DATABASE || 'express-api';
			const connectString = `mongodb+srv://${user}:${password}@cluster0.ewyk4.mongodb.net/${database}?retryWrites=true&w=majority`;
			const mongooseOptions = {
				useNewUrlParser: true,
				useUnifiedTopology: true
			};

			if (isDevelopment) {
				Mongoose.set('debug', function (coll, method, query) {
					console.log(
						`${colors.green('Mongoose: ')}${colors.yellow(coll)}.${colors.cyan(method)}(${JSON.stringify(query, null, 2)});`
					);
				});
			}
			await Mongoose.connect(connectString, mongooseOptions);
			console.log(colors.green('Connect to MongoDB successfully!'));
		} catch (err) {
			console.log(colors.red('Connect to MongoDB failure!!!'));
		}
	}
};

export default mongoDB;
