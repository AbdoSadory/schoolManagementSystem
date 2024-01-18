import Joi from 'joi'

export const adminCourseCreateCourse = {
  body: Joi.object({
    title: Joi.string()
      .trim()
      .valid(
        'english',
        'french',
        'history',
        'mathmatics',
        'statistics',
        'physics',
        'chemistry',
        'biology',
        'zoology',
        'computer science',
        'art',
        'music'
      )
      .required(),
    description: Joi.string().trim(),
    specialization: Joi.string()
      .trim()
      .valid(
        'languages',
        'history',
        'science',
        'mathematics',
        'sports',
        'art',
        'technology',
        'music'
      )
      .required(),
    grade: Joi.string()
      .trim()
      .valid('1', '2', '3', '4', '5', '6', '7', '8', '9')
      .required(),
    learningMode: Joi.string()
      .trim()
      .valid('offline', 'online', 'hybrid')
      .required(),
  }),
}

export const adminCourseUpdateCourse = {
  params: Joi.object({
    courseId: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    title: Joi.string()
      .trim()
      .valid(
        'english',
        'french',
        'history',
        'mathmatics',
        'statistics',
        'physics',
        'chemistry',
        'biology',
        'zoology',
        'computer science',
        'art',
        'music'
      ),
    description: Joi.string().trim(),
    specialization: Joi.string()
      .trim()
      .valid(
        'languages',
        'history',
        'science',
        'mathematics',
        'sports',
        'art',
        'technology',
        'music'
      ),
    grade: Joi.string()
      .trim()
      .valid('1', '2', '3', '4', '5', '6', '7', '8', '9'),
  }),
}
