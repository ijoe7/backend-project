import Joi from "joi";

export const validateJsonPatch = (element) => {
    const schema = Joi.object({
        jsonObj: Joi.object().required(),
        jsonPatchObj: Joi.array().required()
    });
    return schema.validate(element);
};
