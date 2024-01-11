import Joi from 'joi'

export const adminSignInSchema = {
  body: Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
  }).with('email', 'password'),
}

export const adminSignUpSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
  }),
}
