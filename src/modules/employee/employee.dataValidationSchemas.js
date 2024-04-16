import {
  courseSpecializationEnum,
  educationDegreeEnum,
  employeePositionEnum,
  employeeTypeEnum,
  genderEnum,
  maritalStatusEnum,
} from '../../utils/generalConstants.js'
import Joi from 'joi'
export const UpdateProfileSchema = {
  body: Joi.object({
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
