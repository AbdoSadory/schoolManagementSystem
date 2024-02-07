import Joi from 'joi'
import {
  courseSpecializationEnum,
  educationDegreeEnum,
  employeePositionEnum,
  employeeTypeEnum,
  genderEnum,
  maritalStatusEnum,
} from '../../../utils/generalConstants.js'

export const adminEmployeeCreateEmployee = {
  body: Joi.object({
    name: Joi.string().trim().min(6).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
    nationalID: Joi.string().trim().min(14).max(14).required(),
    nationality: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim().min(7).max(15).required(),
    age: Joi.number().required(),
    gender: Joi.string()
      .trim()
      .valid(...genderEnum)
      .required(),
    maritalStatus: Joi.string()
      .trim()
      .valid(...maritalStatusEnum)
      .required(),
    graduationYear: Joi.date().less('now'),
    educationDegree: Joi.string()
      .trim()
      .valid(...educationDegreeEnum)
      .required(),
    employeePosition: Joi.string()
      .trim()
      .valid(...employeePositionEnum)
      .required(),
    specialization: Joi.string()
      .trim()
      .valid(...courseSpecializationEnum),
    employeeType: Joi.string()
      .trim()
      .valid(...employeeTypeEnum)
      .required(),
    salary: Joi.number(),
  }).with('email', 'password'),
}

export const adminEmployeeUpdateEmployee = {
  body: Joi.object({
    employeeEmail: Joi.string().email().trim().required(),
    name: Joi.string().trim().min(6),
    email: Joi.string().email().trim(),
    password: Joi.string().trim().alphanum().min(6),
    nationalID: Joi.string().trim().min(14).max(14),
    nationality: Joi.string().trim(),
    phoneNumber: Joi.string().trim().min(7).max(15),
    age: Joi.number(),
    gender: Joi.string()
      .trim()
      .valid(...genderEnum),
    maritalStatus: Joi.string()
      .trim()
      .valid(...maritalStatusEnum),
    graduationYear: Joi.date().less('now'),
    educationDegree: Joi.string()
      .trim()
      .valid(...educationDegreeEnum),
    employeePosition: Joi.string()
      .trim()
      .valid(...employeePositionEnum),
    specialization: Joi.string()
      .trim()
      .valid(...courseSpecializationEnum),
    employeeType: Joi.string()
      .trim()
      .valid(...employeeTypeEnum),
    profileImage: Joi.string(),
    salary: Joi.number(),
  }),
}

export const adminEmployeeDeleteEmployee = {
  body: Joi.object({
    employeeEmail: Joi.string().email().trim().required(),
  }),
}
