import Joi from "joi";

/**
 * Validates the user's username and password
 * @param {object} user 
 * @returns 
 */
export const validateUser = (user) => {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required()
	});
	return schema.validate(user);
};

