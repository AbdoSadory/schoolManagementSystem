import Joi from 'joi'
import {
  courseSpecializationEnum,
  courseTitleEnum,
  gradeEnum,
  learningModeEnum,
} from '../../../utils/generalConstants.js'

export const adminCourseCreateCourse = {
  body: Joi.object({
    title: Joi.string()
      .trim()
      .valid(...courseTitleEnum)
      .required(),
    description: Joi.string().trim(),
    specialization: Joi.string()
      .trim()
      .valid(...courseSpecializationEnum)
      .required()
      .when('title', [
        {
          is: Joi.string().valid('english', 'french'),
          then: 'languages',
        },
        { is: Joi.string().valid('history'), then: 'history' },
        {
          is: Joi.string().valid(
            'physics',
            'chemistry',
            'biology',
            'zoology',
            'computer science'
          ),
          then: 'science',
        },
        {
          is: Joi.string().valid('mathematics', 'statistics'),
          then: 'mathematics',
        },
        { is: Joi.string().valid('sport'), then: 'sports' },
        { is: Joi.string().valid('art'), then: 'art' },
        { is: Joi.string().valid('music'), then: 'music' },
      ])
      .messages({
        '*': 'The title of the course must be related to specialization',
      }),
    grade: Joi.string()
      .trim()
      .valid(...gradeEnum)
      .required(),
    learningMode: Joi.string()
      .trim()
      .valid(...learningModeEnum)
      .required(),
    isActive: Joi.boolean().required(),
  }),
}

export const adminCourseChangeCourseState = {
  params: Joi.object({
    courseId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    isActive: Joi.boolean().valid(true, false).required(),
  }),
}
export const adminCourseRestoreCourseSchema = {
  params: Joi.object({
    courseId: Joi.number().min(1).required(),
  }),
}

export const adminCourseUpdateCourse = {
  params: Joi.object({
    courseId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    title: Joi.string()
      .trim()
      .valid(...courseTitleEnum),
    description: Joi.string().trim(),
    specialization: Joi.string()
      .trim()
      .valid(...courseSpecializationEnum)
      .when('title', [
        {
          is: Joi.string().valid('english', 'french'),
          then: 'languages',
        },
        { is: Joi.string().valid('history'), then: 'history' },
        {
          is: Joi.string().valid(
            'physics',
            'chemistry',
            'biology',
            'zoology',
            'computer science'
          ),
          then: 'science',
        },
        {
          is: Joi.string().valid('mathematics', 'statistics'),
          then: 'mathematics',
        },
        { is: Joi.string().valid('sport'), then: 'sports' },
        { is: Joi.string().valid('art'), then: 'art' },
        {
          is: Joi.string().valid('music'),
          then: 'music',
        },
      ]),
    grade: Joi.string()
      .trim()
      .valid(...gradeEnum),
    isActive: Joi.boolean(),
  }).with('title', 'specialization'),
}

export const adminCourseDeleteCourse = {
  params: Joi.object({
    courseId: Joi.number().min(1).required(),
  }),
}
