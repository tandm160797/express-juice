import createValidator from '$modules/user/validators/create.validator';
import createTransport from '$modules/user/1-transports/create.transport';

const userModule = {
	create: createTransport,
	validatorExample: [createValidator, createTransport]
};

export default userModule;
