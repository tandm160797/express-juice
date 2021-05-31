const successResponses = (res, data = null, msg = 'success', code = 200) => {
	return res.status(code).json({
		msg,
		...data
	});
};

const errorResponses = (res, data = null, msg = 'error', code = 400) => {
	return res.status(code).json({
		msg,
		...data
	});
};

export { successResponses, errorResponses };
