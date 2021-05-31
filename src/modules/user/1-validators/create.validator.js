const createValidator = (req, res, next) => {
	console.log('1-validator');
	next();
};

export default createValidator;
