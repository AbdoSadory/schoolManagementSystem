import Employee from '../../../../DB/models/employee.mode.js'

export const getAllEmployees = async (req, res, next) => {
  const { name, email } = req.query
  let employees
  if (name || email) {
    employees = await Employee.findAll({
      where: { name: name ? name : '', email: email ? email : '' },
    })
  } else {
    employees = await Employee.findAll()
  }
  res.status(200).json({
    message: 'All Employees',
    employees,
  })
}
export const getEmployee = async (req, res, next) => {
  const { employeeId } = req.params
  console.log(employeeId)
}
export const getEmployeeByEmail = async (req, res, next) => {
  const { email } = req.body
  console.log(email)
}
export const createEmployee = async (req, res, next) => {}
export const updateEmployee = async (req, res, next) => {}
export const deleteEmployee = async (req, res, next) => {}
