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

    gender: Joi.string()
      .trim()
      .valid(...genderEnum)
      .required(),
    grade: Joi.string()
      .trim()
      .valid(...gradeEnum)
      .required(),
    age: Joi.number()
      .required()
      .when('grade', [
        { is: gradeEnum[0], then: Joi.valid(6, 7) },
        { is: gradeEnum[1], then: Joi.valid(7, 8) },
        { is: gradeEnum[2], then: Joi.valid(8, 9) },
        { is: gradeEnum[3], then: Joi.valid(9, 10) },
        { is: gradeEnum[4], then: Joi.valid(10, 11) },
        { is: gradeEnum[5], then: Joi.valid(11, 12) },
        { is: gradeEnum[6], then: Joi.valid(12, 13) },
        { is: gradeEnum[7], then: Joi.valid(13, 14) },
        { is: gradeEnum[8], then: Joi.valid(14, 15) },
      ]),
  })
    .with('email', 'password')
    .with('grade', 'age'),
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
    gender: Joi.string()
      .trim()
      .valid(...genderEnum),
    grade: Joi.string()
      .trim()
      .valid(...gradeEnum),
    age: Joi.number().when('grade', [
      { is: gradeEnum[0], then: Joi.valid(6, 7) },
      { is: gradeEnum[1], then: Joi.valid(7, 8) },
      { is: gradeEnum[2], then: Joi.valid(8, 9) },
      { is: gradeEnum[3], then: Joi.valid(9, 10) },
      { is: gradeEnum[4], then: Joi.valid(10, 11) },
      { is: gradeEnum[5], then: Joi.valid(11, 12) },
      { is: gradeEnum[6], then: Joi.valid(12, 13) },
      { is: gradeEnum[7], then: Joi.valid(13, 14) },
      { is: gradeEnum[8], then: Joi.valid(14, 15) },
    ]),
  }).with('grade', 'age'),
}

export const adminStudentDeleteStudent = {
  body: Joi.object({
    studentEmail: Joi.string().email().trim().required(),
  }),
}
