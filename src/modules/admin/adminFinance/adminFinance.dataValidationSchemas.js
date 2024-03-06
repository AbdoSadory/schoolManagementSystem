import Joi from 'joi'

export const adminFinanceCreateFinance = {
  body: Joi.object({
    year: Joi.number().positive().min(2000).max(2030).required(),
    budget: Joi.number().positive().required(),
    salaries: Joi.number().positive().required(),
    supplement: Joi.number().positive().required(),
    maintenance: Joi.number().positive().required(),
    feesGrade1: Joi.number().positive().required(),
    feesGrade2: Joi.number().positive().required(),
    feesGrade3: Joi.number().positive().required(),
    feesGrade4: Joi.number().positive().required(),
    feesGrade5: Joi.number().positive().required(),
    feesGrade6: Joi.number().positive().required(),
    feesGrade7: Joi.number().positive().required(),
    feesGrade8: Joi.number().positive().required(),
    feesGrade9: Joi.number().positive().required(),
    activities: Joi.number().positive().required(),
    utilities: Joi.number().positive().required(),
  }),
}

export const adminFinanceUpdateFinance = {
  params: Joi.object({
    financeYear: Joi.number().positive().min(2000).max(2030).required(),
  }),
  body: Joi.object({
    year: Joi.number().positive().min(2000).max(2030),
    budget: Joi.number().positive(),
    salaries: Joi.number().positive(),
    supplement: Joi.number().positive(),
    maintenance: Joi.number().positive(),
    feesGrade1: Joi.number().positive(),
    feesGrade2: Joi.number().positive(),
    feesGrade3: Joi.number().positive(),
    feesGrade4: Joi.number().positive(),
    feesGrade5: Joi.number().positive(),
    feesGrade6: Joi.number().positive(),
    feesGrade7: Joi.number().positive(),
    feesGrade8: Joi.number().positive(),
    feesGrade9: Joi.number().positive(),
    activities: Joi.number().positive(),
    utilities: Joi.number().positive(),
  }),
}

export const adminFinanceDeleteFinance = {
  params: Joi.object({
    financeYear: Joi.number().positive().min(2000).max(2030).required(),
  }),
}

export const adminFinanceRestoreFinance = {
  params: Joi.object({
    financeId: Joi.number().min(1).required(),
  }),
}
