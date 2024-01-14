import Joi from 'joi'

export const adminEmployeeCreateEmployee = {
  body: Joi.object({
    name: Joi.string().trim().min(6).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().min(6).required(),
    nationalID: Joi.string().trim().min(14).max(14).required(),
    nationality: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim().min(7).max(15).required(),
    age: Joi.number().required(),
    gender: Joi.string().trim().valid('male', 'female').required(),
    maritalStatus: Joi.string()
      .trim()
      .valid('married', 'widowed', 'separated', 'divorced', 'single')
      .required(),
    graduationYear: Joi.date().less('now'),
    educationDegree: Joi.string()
      .trim()
      .valid('associate', 'bachelor', 'master', 'doctorate')
      .required(),
    employeePosition: Joi.string()
      .trim()
      .valid('junior', 'mid-level', 'senior', 'team-leader', 'manager')
      .required(),
    specialization: Joi.string()
      .trim()
      .valid(
        'languages',
        'history',
        'science',
        'mathematics',
        'sports',
        'art',
        'technology'
      )
      .required(),
    employeeType: Joi.string()
      .trim()
      .valid('owner', 'ceo', 'teacher', 'director', 'hr', 'others')
      .required(),
    salary: Joi.number(),
  }).with('email', 'password'),
}

export const adminEmployeeUpdateEmployee = {
  body: Joi.object({
    employeeEmail: Joi.string().email().trim().required(),
    name: Joi.string().trim().min(6),
    email: Joi.string().email().trim(),
    password: Joi.string().trim().alphanum().min(6),
    nationalID: Joi.string().trim().min(14).max(14),
    nationality: Joi.string().trim(),
    phoneNumber: Joi.string().trim().min(7).max(15),
    age: Joi.number(),
    gender: Joi.string().trim().valid('male', 'female'),
    maritalStatus: Joi.string()
      .trim()
      .valid('married', 'widowed', 'separated', 'divorced', 'single'),
    graduationYear: Joi.date().less('now'),
    educationDegree: Joi.string()
      .trim()
      .valid('associate', 'bachelor', 'master', 'doctorate'),
    employeePosition: Joi.string()
      .trim()
      .valid('junior', 'mid-level', 'senior', 'team-leader', 'manager'),
    specialization: Joi.string()
      .trim()
      .valid(
        'languages',
        'history',
        'science',
        'mathematics',
        'sports',
        'art',
        'technology'
      ),
    employeeType: Joi.string()
      .trim()
      .valid('owner', 'ceo', 'teacher', 'director', 'hr', 'others'),
    profileImagePath: Joi.string(),
    salary: Joi.number(),
  }),
}

export const adminEmployeeDeleteEmployee = {
  body: Joi.object({
    employeeEmail: Joi.string().email().trim().required(),
  }),
}
