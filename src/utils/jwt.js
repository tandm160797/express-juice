import jwt from 'jsonwebtoken';

const verifyToken = (jwtToken, jwtSecretKey, ignoreExpiration = false) => {
	return new Promise((resolve, reject) => {
		jwt.verify(jwtToken, jwtSecretKey, { ignoreExpiration }, (error, decoded) => {
			if (error) {
				return reject(error);
			}
			return resolve(decoded);
		});
	});
};

const generateToken = (jwtPayload, jwtSecretKey, jwtExp) => {
	return new Promise((resolve, reject) => {
		const { _id, roles } = jwtPayload;
		jwt.sign({ _id, roles }, jwtSecretKey, { expiresIn: jwtExp }, (error, token) => {
			if (error) {
				return reject(error);
			}
			return resolve(token);
		});
	});
};

export { verifyToken, generateToken };
