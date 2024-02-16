import Joi from 'joi'

export const adminTeachersCoursesGetAllSchema = {
  query: Joi.object({
    teacherId: Joi.string().guid({ version: ['uuidv4'], separator: '-' }),
    courseId: Joi.number().min(1),
  }),
}
export const adminTeachersCoursesCreateSchema = {
  body: Joi.object({
    teacherId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .required()
      .messages({ '*': 'teacher id must be uuid4' }),
    courseId: Joi.number().min(1).required(),
  }),
}

export const adminTeachersCoursesUpdateSchema = {
  params: Joi.object({
    teacherCourseId: Joi.number().min(1),
  }),
  body: Joi.object({
    teacherId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .messages({ '*': 'teacher id must be uuid4' }),
    courseId: Joi.number().min(1),
  }),
}

export const adminTeachersCoursesDeleteSchema = {
  params: Joi.object({
    teacherCourseId: Joi.number().min(1),
  }),
}
