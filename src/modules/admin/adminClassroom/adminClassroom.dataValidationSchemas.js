import Joi from 'joi'
import JoiDate from '@joi/date'

const joi = Joi.extend(JoiDate)
export const adminClassroomGetAllClassroomsSchema = {
  query: joi.object({
    term: joi.string().valid('first', 'second', 'summer'),
    grade: joi.string().valid('1', '2', '3', '4', '5', '6', '7', '8', '9'),
    year: joi.date().format('YYYY'),
    learningMode: joi.string().valid('offline', 'online', 'hybrid'),
  }),
}
export const adminClassroomCreateClassroomSchema = {
  body: joi.object({
    term: joi.string().valid('first', 'second', 'summer').required(),
    grade: joi
      .string()
      .valid('1', '2', '3', '4', '5', '6', '7', '8', '9')
      .required(),
    year: joi.date().format('YYYY').required(),
    learningMode: joi.string().valid('offline', 'online', 'hybrid').required(),
  }),
}
export const adminClassroomUpdateClassroomSchema = {
  body: joi.object({
    term: joi.string().valid('first', 'second', 'summer'),
    grade: joi.string().valid('1', '2', '3', '4', '5', '6', '7', '8', '9'),
    year: joi.date().format('YYYY'),
    learningMode: joi.string().valid('offline', 'online', 'hybrid'),
    courseId: joi.number(),
  }),
}
