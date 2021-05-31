import createValidator from './1-validators/create.validator.js';
import createTransport from './2-transports/create.transport.js';

const userModule = {
	create: createTransport,
	validatorExample: [createValidator, createTransport]
};

export default userModule;
