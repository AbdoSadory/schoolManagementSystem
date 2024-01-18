import Finance from '../../../../DB/models/finance.model.js'

export const getAllFinance = async (req, res, next) => {
  const { year } = req.query
  let finance
  if (year) {
    finance = await Finance.findAll({
      where: { year },
    })
  } else {
    finance = await Finance.findAll()
  }
  res.status(200).json({
    message: 'All Finance',
    finance: finance.length ? finance : 'No finance data yet',
  })
}

export const createFinance = async (req, res, next) => {
  const {
    year,
    budget,
    salaries,
    supplement,
    maintenance,
    feesGrade1,
    feesGrade2,
    feesGrade3,
    feesGrade4,
    feesGrade5,
    feesGrade6,
    feesGrade7,
    feesGrade8,
    feesGrade9,
    activities,
    utilities,
  } = req.body

  const isFinanceYearExisted = await Finance.findOne({ where: { year } })
  if (isFinanceYearExisted) {
    return next(
      new Error(
        'This Finance Year is already existed, please update it or change the year',
        { cause: 400 }
      )
    )
  }
  const newFinance = await Finance.create({
    year,
    budget,
    salaries,
    supplement,
    maintenance,
    feesGrade1,
    feesGrade2,
    feesGrade3,
    feesGrade4,
    feesGrade5,
    feesGrade6,
    feesGrade7,
    feesGrade8,
    feesGrade9,
    activities,
    utilities,
  })
  if (!newFinance) {
    return next(new Error('Error While Creating Finance'))
  }
  res.json({ message: 'New Finance Row', newFinance })
}
export const updateFinance = async (req, res, next) => {
  const {
    year,
    budget,
    salaries,
    supplement,
    maintenance,
    feesGrade1,
    feesGrade2,
    feesGrade3,
    feesGrade4,
    feesGrade5,
    feesGrade6,
    feesGrade7,
    feesGrade8,
    feesGrade9,
    activities,
    utilities,
  } = req.body
  const { financeYear } = req.params

  const isFinanceYearExisted = await Finance.findOne({
    where: { year: financeYear },
  })
  if (!isFinanceYearExisted) {
    return next(
      new Error('This Finance Year is not existed', {
        cause: 404,
      })
    )
  }
  if (year) {
    const isYearExisted = await Finance.findOne({
      where: { year },
    })
    if (isYearExisted && isYearExisted.id !== isFinanceYearExisted.id) {
      return next(
        new Error('The "year" value is already existed', {
          cause: 400,
        })
      )
    }
  }

  year && (isFinanceYearExisted.year = year)
  budget && (isFinanceYearExisted.budget = budget)
  salaries && (isFinanceYearExisted.salaries = salaries)
  supplement && (isFinanceYearExisted.supplement = supplement)
  maintenance && (isFinanceYearExisted.maintenance = maintenance)
  feesGrade1 && (isFinanceYearExisted.feesGrade1 = feesGrade1)
  feesGrade2 && (isFinanceYearExisted.feesGrade2 = feesGrade2)
  feesGrade3 && (isFinanceYearExisted.feesGrade3 = feesGrade3)
  feesGrade4 && (isFinanceYearExisted.feesGrade4 = feesGrade4)
  feesGrade5 && (isFinanceYearExisted.feesGrade5 = feesGrade5)
  feesGrade6 && (isFinanceYearExisted.feesGrade6 = feesGrade6)
  feesGrade7 && (isFinanceYearExisted.feesGrade7 = feesGrade7)
  feesGrade8 && (isFinanceYearExisted.feesGrade8 = feesGrade8)
  feesGrade9 && (isFinanceYearExisted.feesGrade9 = feesGrade9)
  activities && (isFinanceYearExisted.activities = activities)
  utilities && (isFinanceYearExisted.utilities = utilities)

  const updatedFinanceYear = await isFinanceYearExisted.save()
  if (!updatedFinanceYear) {
    return next(new Error('Error while updating The finance year data'))
  }
  res
    .status(200)
    .json({ message: 'Updated Finance Year Data', updatedFinanceYear })
}
export const deleteFinance = async (req, res, next) => {
  const { financeYear } = req.params
  const isFinanceYearExisted = await Finance.findOne({
    where: {
      year: financeYear,
    },
  })
  if (!isFinanceYearExisted) {
    return next(
      new Error('This Finance Year is not existed', {
        cause: 404,
      })
    )
  }
  const deletedFinance = await Finance.destroy({
    where: { year: financeYear },
    force: true,
  })
  if (!deletedFinance) {
    return next(new Error('Error While deleting Finance Year'))
  }

  res.status(204).json({ message: 'Deleted Finance Year Data', deletedFinance })
}
