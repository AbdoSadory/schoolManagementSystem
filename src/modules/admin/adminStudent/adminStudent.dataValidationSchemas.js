import Joi from 'joi'

export const adminStudentCreateStudent = {
  body: Joi.object({
    name: Joi.string().trim().min(6).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
    phoneNumber: Joi.string().trim().min(7).max(15).required(),
    parentPhoneNumber: Joi.string()
      .trim()
      .min(7)
      .max(15)
      .disallow(Joi.ref('phoneNumber'))
      .required()
      .messages({
        '*': 'parentPhoneNumber must be valid Phone Number and not equal phoneNumber field value',
      }),
    totalFees: Joi.number(),
    paidFees: Joi.number(),
    feesStatus: Joi.string().trim().valid('paid', 'notPaid').required(),
    nationality: Joi.string().trim().required(),
    age: Joi.number().required(),
    gender: Joi.string().trim().valid('male', 'female').required(),
    grade: Joi.string()
      .trim()
      .valid('1', '2', '3', '4', '5', '6', '7', '8', '9')
      .required(),
  }).with('email', 'password'),
}

export const adminStudentUpdateStudent = {
  body: Joi.object({
    studentEmail: Joi.string().email().trim().required(),
    name: Joi.string().trim().min(6),
    email: Joi.string().email().trim(),
    password: Joi.string().trim().alphanum().min(6),
    phoneNumber: Joi.string().trim().min(7).max(15),
    parentPhoneNumber: Joi.string().trim().min(7).max(15),
    totalFees: Joi.number(),
    paidFees: Joi.number(),
    feesStatus: Joi.string().trim().valid('paid', 'notPaid'),
    nationality: Joi.string().trim(),
    age: Joi.number(),
    gender: Joi.string().trim().valid('male', 'female'),
    grade: Joi.string()
      .trim()
      .valid('1', '2', '3', '4', '5', '6', '7', '8', '9'),
  }),
}

export const adminStudentDeleteStudent = {
  body: Joi.object({
    studentEmail: Joi.string().email().trim().required(),
  }),
}
