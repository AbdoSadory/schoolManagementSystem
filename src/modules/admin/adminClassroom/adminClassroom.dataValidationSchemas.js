import Joi from 'joi'
import JoiDate from '@joi/date'
import {
  gradeEnum,
  learningModeEnum,
  termEnum,
} from '../../../utils/generalConstants.js'

const joi = Joi.extend(JoiDate)
export const adminClassroomGetAllClassroomsSchema = {
  query: joi.object({
    term: joi.string().valid(...termEnum),
    grade: joi.string().valid(...gradeEnum),
    year: joi.date().format('YYYY'),
    learningMode: joi.string().valid(...learningModeEnum),
  }),
}
export const adminClassroomCreateClassroomSchema = {
  body: joi.object({
    term: joi
      .string()
      .valid(...termEnum)
      .required(),
    grade: joi
      .string()
      .valid(...gradeEnum)
      .required(),
    year: joi.date().format('YYYY').required(),
    learningMode: joi
      .string()
      .valid(...learningModeEnum)
      .required(),
    courseId: joi.number().required(),
  }),
}
export const adminClassroomChangeClassroomStateSchema = {
  params: Joi.object({
    classroomId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    isActive: Joi.boolean().valid(true, false).required(),
  }),
}
export const adminClassroomRestoreClassroomSchema = {
  params: Joi.object({
    classroomId: Joi.number().min(1).required(),
  }),
}
export const adminClassroomUpdateClassroomSchema = {
  body: joi.object({
    term: joi.string().valid(...termEnum),
    grade: joi.string().valid(...gradeEnum),
    year: joi.date().format('YYYY'),
    learningMode: joi.string().valid(...learningModeEnum),
    courseId: joi.number(),
  }),
}
