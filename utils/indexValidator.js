import Joi from "joi";

/**
 * Validates the JSON Object and the JSON patch object
 * @param {object} element 
 * @returns 
 */
export const validateJsonPatch = (element) => {
	const schema = Joi.object({
		jsonObj: Joi.object().required(),
		jsonPatchObj: Joi.array().required()
	});
	return schema.validate(element);
};
