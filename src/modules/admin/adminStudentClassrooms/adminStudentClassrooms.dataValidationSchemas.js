import Joi from 'joi'

export const adminStudentsClassroomsGetAllSchema = {
  query: Joi.object({
    studentId: Joi.string().guid({ version: ['uuidv4'], separator: '-' }),
    classroomId: Joi.number().min(1),
  }),
}
export const adminStudentsClassroomsCreateSchema = {
  body: Joi.object({
    studentId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .required()
      .messages({ '*': 'student id must be uuid4' }),
    classroomId: Joi.number().min(1).required(),
  }),
}

export const adminStudentsClassroomsUpdateSchema = {
  params: Joi.object({
    studentClassroomId: Joi.number().min(1),
  }),
  body: Joi.object({
    studentId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .messages({ '*': 'student id must be uuid4' }),
    classroomId: Joi.number().min(1),
  }),
}

export const adminStudentsClassroomsDeleteSchema = {
  params: Joi.object({
    studentClassroomId: Joi.number().min(1),
  }),
}
