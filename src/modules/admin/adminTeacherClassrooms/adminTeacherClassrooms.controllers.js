import { Op } from 'sequelize'
import ClassRoom from '../../../../DB/models/classRoom.model.js'
import Course from '../../../../DB/models/course.model.js'
import Employee from '../../../../DB/models/employee.mode.js'
import TeachersClassRooms from '../../../../DB/models/junctionTables/teachersClassRooms.model.js'

export const getAllTeachersClassrooms = async (req, res, next) => {
  const { teacherId, classroomId } = req.query
  let query = {}
  teacherId && (query.tblEmployeeId = teacherId)
  classroomId && (query.tblClassRoomId = classroomId)
  const teachersClassrooms = await TeachersClassRooms.findAll({
    where: query,
  })

  res.status(200).json({
    message: 'All teachers Classrooms',
    teachersClassrooms,
  })
}

/**
 * check if classroom is existed
 * check if the employee is existed
 * check if the employee is teacher
 * check if the classroom and teacher is already existed
 * check if the teacher is the same specialization of the course included in classroom
 * create
 */
export const createTeachersClassroom = async (req, res, next) => {
  const { classroomId, teacherId } = req.body

  const isClassroomExisted = await ClassRoom.findByPk(classroomId, {
    include: { model: Course },
  })
  if (!isClassroomExisted)
    return next(new Error('No classroom with this id', { cause: 404 }))
  if (!isClassroomExisted.isActive)
    return next(new Error("this classroom isn't active", { cause: 409 }))

  const isTeacherExisted = await Employee.findByPk(teacherId)
  if (!isTeacherExisted)
    return next(new Error('No Employee with this id', { cause: 404 }))

  if (isTeacherExisted.employeeType !== 'teacher')
    return next(new Error('This employee is not teacher', { cause: 409 }))

  const isTeacherClassroomExisted = await TeachersClassRooms.findOne({
    where: { tblEmployeeId: teacherId, tblClassRoomId: classroomId },
  })
  if (isTeacherClassroomExisted)
    return next(
      new Error('Teacher and Classroom record is already existed', {
        cause: 409,
      })
    )

  if (
    isTeacherExisted.specialization !==
    isClassroomExisted.tbl_course.specialization
  )
    return next(
      new Error(
        "Teacher and Classroom's course, haven't got the same specialization",
        { cause: 409 }
      )
    )

  const newTeacherClassroom = await TeachersClassRooms.create({
    tblEmployeeId: teacherId,
    tblClassRoomId: classroomId,
  })
  if (!newTeacherClassroom)
    return next(new Error('Error while creating teacher classroom record'))

  res
    .status(201)
    .json({ message: 'Teacher Classroom Record', newTeacherClassroom })
}

/**

 * @param {teacherClassroomId}
 * @body {teacherId, classroomId}
 * check if TeachersClassroom is existed
 * check if employee is existed
 * check if employee is teacher
 * check if teacher has the same specialization of the previous teacher
 * check if course is existed
 * check if course has the same specialization of the previous course
 * check if new data is already existed in table
 * update them
 */
export const updateTeachersClassroom = async (req, res, next) => {
  const { teacherClassroomId } = req.params
  const { teacherId, classroomId } = req.body

  const isTeacherClassroomExisted = await TeachersClassRooms.findByPk(
    teacherClassroomId,
    { include: [{ model: Employee }, { model: ClassRoom }] }
  )
  if (!isTeacherClassroomExisted)
    return next(new Error('No teacher-classroom with this id'), { cause: 404 })

  const isUpdatedTeacherClassroomExisted = await TeachersClassRooms.findOne({
    where: {
      id: { [Op.ne]: teacherClassroomId },
      tblEmployeeId: teacherId || isTeacherClassroomExisted.tblEmployeeId,
      tblClassRoomId: classroomId || isTeacherClassroomExisted.tblClassRoomId,
    },
  })

  if (isUpdatedTeacherClassroomExisted)
    return next(
      new Error("There's already teacher-classroom existed", { cause: 409 })
    )

  if (teacherId) {
    const isEmployeeExisted = await Employee.findByPk(teacherId)
    if (!isEmployeeExisted)
      return next(new Error('No Employee with this id', { cause: 404 }))

    if (isEmployeeExisted.employeeType !== 'teacher')
      return next(new Error('This employee is not teacher', { cause: 404 }))

    if (
      isEmployeeExisted.specialization !==
      isTeacherClassroomExisted.tbl_employee.specialization
    )
      return next(
        new Error(
          "This Teacher hasn't got the same specialization of the previous teacher",
          { cause: 409 }
        )
      )

    isTeacherClassroomExisted.tblEmployeeId = teacherId
  }

  if (classroomId) {
    const isClassroomExisted = await ClassRoom.findByPk(classroomId)
    if (!isClassroomExisted)
      return next(new Error('No classroom with this id', { cause: 409 }))
    if (!isClassroomExisted.isActive)
      return next(new Error("this classroom isn't active", { cause: 409 }))
    if (
      isClassroomExisted.specialization !==
      isTeacherClassroomExisted.tbl_classRoom.specialization
    )
      return next(
        new Error(
          "This Course hasn't got the same specialization of the previous course",
          { cause: 409 }
        )
      )

    isTeacherClassroomExisted.tblClassRoomId = classroomId
  }

  const updatedTeacherClassroom = await isTeacherClassroomExisted.save()

  res.status(200).json({
    message: 'Updated Teacher-Classroom successfully',
    updatedTeacherClassroom,
  })
}

export const deleteTeachersClassrooms = async (req, res, next) => {
  const { teacherClassroomId } = req.params

  const isTeacherClassroomExisted = await TeachersClassRooms.findByPk(
    teacherClassroomId
  )
  if (!isTeacherClassroomExisted)
    return next(new Error('No teacher-Classroom with this id'), { cause: 404 })

  const deletedTeacherClassroom = await isTeacherClassroomExisted.destroy()
  if (!deletedTeacherClassroom) {
    return next(new Error('Error While deleting teacher-classroom'))
  }
  res.status(200).json({
    message: 'Teacher-Classroom has been deleted successfully',
  })
}

export const restoreTeachersClassrooms = async (req, res, next) => {
  const { teacherClassroomId } = req.params
  const isTeachersClassroomExisted = await TeachersClassRooms.findByPk(
    teacherClassroomId,
    {
      paranoid: false,
    }
  )
  if (!isTeachersClassroomExisted)
    return next(new Error('No Teachers-Classroom with this id', { cause: 404 }))

  const restoredTeacherClassroom = await isTeachersClassroomExisted.restore()
  if (!restoredTeacherClassroom)
    return next(new Error('Error while restoring Teachers-Classroom'))

  res.status(200).json({
    message: 'Teacher-Classroom has been restored successfully',
    restoredTeacherClassroom,
  })
}
