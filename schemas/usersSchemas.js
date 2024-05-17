import Joi from "joi";

export const registerUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
});
