import Joi from 'joi'
import {
  feesStatusEnum,
  genderEnum,
  gradeEnum,
} from '../../../utils/generalConstants.js'

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
    feesStatus: Joi.string()
      .trim()
      .valid(...feesStatusEnum)
      .required(),
    nationality: Joi.string().trim().required(),
    age: Joi.number().required(),
    gender: Joi.string()
      .trim()
      .valid(...genderEnum)
      .required(),
    grade: Joi.string()
      .trim()
      .valid(...gradeEnum)
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
    feesStatus: Joi.string()
      .trim()
      .valid(...feesStatusEnum),
    nationality: Joi.string().trim(),
    age: Joi.number(),
    gender: Joi.string()
      .trim()
      .valid(...genderEnum),
    grade: Joi.string()
      .trim()
      .valid(...gradeEnum),
  }),
}

export const adminStudentDeleteStudent = {
  body: Joi.object({
    studentEmail: Joi.string().email().trim().required(),
  }),
}
