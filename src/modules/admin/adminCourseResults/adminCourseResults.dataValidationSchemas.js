import Joi from 'joi'
import JoiDate from '@joi/date'
import { termEnum } from '../../../utils/generalConstants.js'

const joi = Joi.extend(JoiDate)
export const adminCourseResultCreateCourseResultSchema = {
  body: joi.object({
    year: joi.date().format('YYYY').less('now').required(),
    term: joi
      .string()
      .valid(...termEnum)
      .required(),
    oral: joi.number().min(0).required(),
    practical: joi.number().min(0).required(),
    midterm: joi.number().min(0).required(),
    final: joi.number().min(0).required(),
    studentId: joi
      .string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .required()
      .messages({
        '*': 'Id must be uuidv4 with separator',
      }),
    courseId: joi.number().required(),
  }),
}

export const adminCourseResultGetCourseResultByIdSchema = {
  params: Joi.object({
    courseResultId: Joi.number().min(1),
  }),
}
export const adminCourseResultGetCourseResultByCourseIdSchema = {
  params: Joi.object({
    courseId: Joi.number(),
  }),
}
export const adminCourseResultGetCourseResultByStudentIdSchema = {
  params: Joi.object({
    studentId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .messages({
        '*': 'Id must be uuidv4 with separator',
      }),
  }),
}

export const adminCourseResultRestoreCourseResultSchema = {
  params: Joi.object({
    courseResultId: Joi.number().min(1),
  }),
}

export const adminCourseResultUpdateCourseResultSchema = {
  params: joi.object({
    courseResultId: joi.number(),
  }),
  body: joi.object({
    year: joi.date().format('YYYY').less('now'),
    term: joi.string().valid(...termEnum),
    oral: joi.number().min(0),
    practical: joi.number().min(0),
    midterm: joi.number().min(0),
    final: joi.number().min(0),
    studentId: joi
      .string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .messages({
        '*': 'Id must be uuidv4 with separator',
      }),
    courseId: joi.number(),
  }),
}

export const adminCourseResultDeleteCourseResultSchema = {
  params: joi.object({
    courseResultId: joi.number(),
  }),
}
