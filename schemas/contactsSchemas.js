import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "The phone number must be on the form (XXX) XXX-XXXX",
    }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base":
        "The phone number must be on the form (XXX) XXX-XXXX",
    }),
  favorite: Joi.boolean(),
}).or("name", "email", "phone", "favorite");

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
