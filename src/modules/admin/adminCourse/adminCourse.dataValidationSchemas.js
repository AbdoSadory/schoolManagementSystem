import Joi from 'joi'

export const adminCourseCreateCourse = {
  body: Joi.object({
    title: Joi.string()
      .trim()
      .valid(
        'english',
        'french',
        'history',
        'mathematics',
        'statistics',
        'physics',
        'chemistry',
        'biology',
        'zoology',
        'computer science',
        'sport',
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
        'music'
      )
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
      ]),
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
        'mathematics',
        'statistics',
        'physics',
        'chemistry',
        'biology',
        'zoology',
        'computer science',
        'sport',
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
        'music'
      )
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
      .valid('1', '2', '3', '4', '5', '6', '7', '8', '9'),
  }).with('title', 'specialization'),
}
