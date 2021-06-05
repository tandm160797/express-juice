const createTransport = (req, res, next) => {
	console.log('1-transport');
	// Handle logic
	next();
};

export default createTransport;
