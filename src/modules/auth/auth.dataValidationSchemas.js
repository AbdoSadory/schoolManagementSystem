import Joi from 'joi'

export const signInSchema = {
  body: Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
  }),
  query: Joi.object({
    model: Joi.string().valid('Student', 'Employee').required(),
  }),
}
