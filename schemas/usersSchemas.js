import Joi from "joi";
import { subscriptionUserList } from "../constans/userConstans.js";

export const registerUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

export const signinUserSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
});

export const subscriptionUserSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionUserList)
    .required(),
});
