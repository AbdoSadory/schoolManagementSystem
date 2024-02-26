import Joi from 'joi'

export const adminTeachersClassroomsGetAllSchema = {
  query: Joi.object({
    teacherId: Joi.string().guid({ version: ['uuidv4'], separator: '-' }),
    classroomId: Joi.number().min(1),
  }),
}
export const adminTeachersClassroomsCreateSchema = {
  body: Joi.object({
    teacherId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .required()
      .messages({ '*': 'teacher id must be uuid4' }),
    classroomId: Joi.number().min(1).required(),
  }),
}

export const adminTeachersClassroomsUpdateSchema = {
  params: Joi.object({
    teacherClassroomId: Joi.number().min(1),
  }),
  body: Joi.object({
    teacherId: Joi.string()
      .guid({ version: ['uuidv4'], separator: '-' })
      .messages({ '*': 'teacher id must be uuid4' }),
    classroomId: Joi.number().min(1),
  }),
}

export const adminTeachersClassroomsDeleteSchema = {
  params: Joi.object({
    teacherClassroomId: Joi.number().min(1),
  }),
}
