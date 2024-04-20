import {
  courseSpecializationEnum,
  courseTitleEnum,
  educationDegreeEnum,
  employeePositionEnum,
  employeeTypeEnum,
  genderEnum,
  gradeEnum,
  learningModeEnum,
  maritalStatusEnum,
  termEnum,
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
export const createClassroomSchema = {
  body: Joi.object({
    term: Joi.string()
      .valid(...termEnum)
      .required(),
    grade: Joi.string()
      .valid(...gradeEnum)
      .required(),
    year: Joi.date().format('YYYY').required(),
    learningMode: Joi.string()
      .valid(...learningModeEnum)
      .required(),
    courseId: Joi.number().required(),
  }),
}
export const updateClassroomSchema = {
  body: Joi.object({
    term: Joi.string().valid(...termEnum),
    grade: Joi.string().valid(...gradeEnum),
    year: Joi.date().format('YYYY'),
    learningMode: Joi.string().valid(...learningModeEnum),
    courseId: Joi.number(),
  }),
}
export const createCourseSchema = {
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
export const updateCourseSchema = {
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
