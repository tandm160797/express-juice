import jwt from 'jsonwebtoken';

const verifyToken = (token, secretKey, options) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, options, (err, payload) => {
			err ? reject(err) : resolve(payload);
		});
	});
};

const generateToken = (payload, secretKey, options) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secretKey, options, (err, token) => {
			err ? reject(err) : resolve(token);
		});
	});
};

const auth = async (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.slice(7);
	const secretKey = process.env.JWT_SECRET_KEY;

	try {
		await verifyToken(token, secretKey);
		next();
	} catch ({ message }) {
		res.status(401).json({ message });
	}
};

const role = (rolesCheck) => async (req, res, next) => {
	const token = req.headers.authorization && req.headers.authorization.slice(7);
	const secretKey = process.env.JWT_SECRET_KEY;

	try {
		const { role } = await verifyToken(token, secretKey);

		if (typeof rolesCheck === 'string') {
			rolesCheck === role
				? next()
				: res.status(403).json({ message: "Access denied, you don't have role to access" });
		}

		if (Array.isArray(rolesCheck)) {
			const isRole = rolesCheck.some((roleCheck) => role.includes(roleCheck));
			isRole ? next() : res.status(403).json({ message: "Access denied, you don't have role to access" });
		}
	} catch ({ message }) {
		res.status(401).json({ message });
	}
};

// JWT message error: jwt expired, jwt malformed, jwt must be provided, invalid signature

export { verifyToken, generateToken, auth, role };
