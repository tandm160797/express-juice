const createValidator = (req, res, next) => {
	console.log('Validator');
	next();
};

export default createValidator;
