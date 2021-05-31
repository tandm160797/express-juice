import { verifyToken } from './../common/jwt';
import { handleJWTErrorMessage } from './../utils/handle-jwt-error-message';

const authentication = async (request, response, next) => {
	let jwtAccessToken = request.headers.authorization;
	const jwtAccessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

	if (jwtAccessToken) {
		jwtAccessToken = jwtAccessToken.replace('Bearer ', '');
	}

	try {
		await verifyToken(jwtAccessToken, jwtAccessTokenSecretKey);
		return next();
	} catch (error) {
		let { message } = error;
		message = handleJWTErrorMessage(message);
		return response.status(401).json({ message });
	}
};

const authorization = (roleCheck) => async (request, response, next) => {
	let jwtAccessToken = request.headers.authorization;
	const jwtAccessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

	if (jwtAccessToken) {
		jwtAccessToken = jwtAccessToken.replace('Bearer ', '');
	}

	try {
		const jwtPayload = await verifyToken(jwtAccessToken, jwtAccessTokenSecretKey);
		const { roles } = jwtPayload;
		const isPermission = roles.includes(roleCheck);

		if (isPermission) {
			return next();
		}
		return response.status(403).json({
			message: "Access denied, you don't have permission to access"
		});
	} catch (error) {
		let { message } = error;
		message = handleJWTErrorMessage(message);
		return response.status(401).json({ message });
	}
};

const authorizationAnd = (rolesCheck) => async (request, response, next) => {
	let jwtAccessToken = request.headers.authorization;
	const jwtAccessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

	if (jwtAccessToken) {
		jwtAccessToken = jwtAccessToken.replace('Bearer ', '');
	}

	try {
		const jwtPayload = await verifyToken(jwtAccessToken, jwtAccessTokenSecretKey);
		const { roles } = jwtPayload;
		const isPermission = rolesCheck.every((roleCheck) => roles.includes(roleCheck));

		console.log({ isPermission });
		if (isPermission) {
			return next();
		}
		return response.status(403).json({
			message: "Access denied, you don't have permission to access"
		});
	} catch (error) {
		let { message } = error;
		message = handleJWTErrorMessage(message);
		return response.status(401).json({ message });
	}
};

const authorizationOr = (rolesCheck) => async (request, response, next) => {
	let jwtAccessToken = request.headers.authorization;
	const jwtAccessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

	if (jwtAccessToken) {
		jwtAccessToken = jwtAccessToken.replace('Bearer ', '');
	}

	try {
		const jwtPayload = await verifyToken(jwtAccessToken, jwtAccessTokenSecretKey);
		const { roles } = jwtPayload;
		const isPermission = rolesCheck.some((roleCheck) => roles.includes(roleCheck));

		if (isPermission) {
			return next();
		}
		return response.status(403).json({
			message: "Access denied, you don't have permission to access"
		});
	} catch (error) {
		let { message } = error;
		message = handleJWTErrorMessage(message);
		return response.status(401).json({ message });
	}
};

export { authentication, authorization, authorizationAnd, authorizationOr };
