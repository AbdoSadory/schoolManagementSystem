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
import joiDate from '@joi/date'
const joi = Joi.extend(joiDate)

export const UpdateProfileSchema = {
  body: joi.object({
    name: joi.string().trim().min(6),
    email: joi.string().email().trim(),
    password: joi.string().trim().alphanum().min(6),
    nationalID: joi.string().trim().min(14).max(14),
    nationality: joi.string().trim(),
    phoneNumber: joi.string().trim().min(7).max(15),
    age: joi.number(),
    gender: joi
      .string()
      .trim()
      .valid(...genderEnum),
    maritalStatus: joi
      .string()
      .trim()
      .valid(...maritalStatusEnum),
    graduationYear: joi.date().less('now'),
    educationDegree: joi
      .string()
      .trim()
      .valid(...educationDegreeEnum),
    employeePosition: joi
      .string()
      .trim()
      .valid(...employeePositionEnum),
    specialization: joi
      .string()
      .trim()
      .valid(...courseSpecializationEnum),
    employeeType: joi
      .string()
      .trim()
      .valid(...employeeTypeEnum),
    profileImage: joi.string(),
    salary: joi.number(),
  }),
}
export const createClassroomSchema = {
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
export const updateClassroomSchema = {
  body: joi.object({
    term: joi.string().valid(...termEnum),
    grade: joi.string().valid(...gradeEnum),
    year: joi.date().format('YYYY'),
    learningMode: joi.string().valid(...learningModeEnum),
    courseId: joi.number(),
  }),
}
export const deleteClassroomSchema = {
  params: joi.object({
    classroomId: joi.number().min(1).required(),
  }),
}
export const createCourseSchema = {
  body: joi.object({
    title: joi
      .string()
      .trim()
      .valid(...courseTitleEnum)
      .required(),
    description: joi.string().trim(),
    specialization: joi
      .string()
      .trim()
      .valid(...courseSpecializationEnum)
      .required()
      .when('title', [
        {
          is: joi.string().valid('english', 'french'),
          then: 'languages',
        },
        { is: joi.string().valid('history'), then: 'history' },
        {
          is: joi
            .string()
            .valid(
              'physics',
              'chemistry',
              'biology',
              'zoology',
              'computer science'
            ),
          then: 'science',
        },
        {
          is: joi.string().valid('mathematics', 'statistics'),
          then: 'mathematics',
        },
        { is: joi.string().valid('sport'), then: 'sports' },
        { is: joi.string().valid('art'), then: 'art' },
        { is: joi.string().valid('music'), then: 'music' },
      ])
      .messages({
        '*': 'The title of the course must be related to specialization',
      }),
    grade: joi
      .string()
      .trim()
      .valid(...gradeEnum)
      .required(),
    learningMode: joi
      .string()
      .trim()
      .valid(...learningModeEnum)
      .required(),
    isActive: joi.boolean().required(),
  }),
}
export const updateCourseSchema = {
  params: joi.object({
    courseId: joi.number().min(1).required(),
  }),
  body: joi
    .object({
      title: joi
        .string()
        .trim()
        .valid(...courseTitleEnum),
      description: joi.string().trim(),
      specialization: joi
        .string()
        .trim()
        .valid(...courseSpecializationEnum)
        .when('title', [
          {
            is: joi.string().valid('english', 'french'),
            then: 'languages',
          },
          { is: joi.string().valid('history'), then: 'history' },
          {
            is: joi
              .string()
              .valid(
                'physics',
                'chemistry',
                'biology',
                'zoology',
                'computer science'
              ),
            then: 'science',
          },
          {
            is: joi.string().valid('mathematics', 'statistics'),
            then: 'mathematics',
          },
          { is: joi.string().valid('sport'), then: 'sports' },
          { is: joi.string().valid('art'), then: 'art' },
          {
            is: joi.string().valid('music'),
            then: 'music',
          },
        ]),
      grade: joi
        .string()
        .trim()
        .valid(...gradeEnum),
      isActive: joi.boolean(),
    })
    .with('title', 'specialization'),
}
export const deleteCourseSchema = {
  params: joi.object({
    courseId: joi.number().min(1).required(),
  }),
}
export const restoreCourseSchema = {
  params: joi.object({
    courseId: joi.number().min(1).required(),
  }),
}

export const createCourseResultSchema = {
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

export const getCourseResultByIdSchema = {
  params: Joi.object({
    courseResultId: Joi.number().min(1),
  }),
}

export const updateCourseResultSchema = {
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

export const deleteCourseResultSchema = {
  params: Joi.object({
    courseResultId: Joi.number().min(1),
  }),
}
export const restoreCourseResultSchema = {
  params: Joi.object({
    courseResultId: Joi.number().min(1),
  }),
}
