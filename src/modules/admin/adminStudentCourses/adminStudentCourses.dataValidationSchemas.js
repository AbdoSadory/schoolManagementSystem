import Joi from 'joi'

export const adminStudentsCoursesGetAllSchema = {
  query: Joi.object({
    studentId: Joi.string().guid({ version: ['uuidv4'], separator: '-' }),
    courseId: Joi.number().min(1),
  }),
}
export const adminStudentsCoursesCreateSchema = {
  body: Joi.object({
    studentId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .required()
      .messages({ '*': 'student id must be uuid4' }),
    courseId: Joi.number().min(1).required(),
  }),
}

export const adminStudentsCoursesUpdateSchema = {
  params: Joi.object({
    studentCourseId: Joi.number().min(1),
  }),
  body: Joi.object({
    studentId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .messages({ '*': 'student id must be uuid4' }),
    courseId: Joi.number().min(1),
  }),
}

export const adminStudentsCoursesDeleteSchema = {
  params: Joi.object({
    studentCourseId: Joi.number().min(1),
  }),
}

export const adminStudentsCoursesRestoreSchema = {
  params: Joi.object({
    studentCourseId: Joi.number().min(1),
  }),
}
