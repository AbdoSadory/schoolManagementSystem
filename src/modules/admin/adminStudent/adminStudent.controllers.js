import Student from '../../../../DB/models/student.model.js'

export const getAllStudents = async (req, res, next) => {
  const students = await Student.findAll()
  if (!students) return next(new Error('Please Try again'))
  res.status(200).json({ message: 'All Students', students })
}
export const getStudent = async (req, res, next) => {
  const { studentId } = req.params
}
export const createStudent = async (req, res, next) => {}
export const updateStudent = async (req, res, next) => {}
export const deleteStudent = async (req, res, next) => {}
