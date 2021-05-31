const createTransport = (req, res, next) => {
	console.log('2-transport');
	// Handle logic
	return next();
};

export default createTransport;
