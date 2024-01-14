import { DataTypes } from 'sequelize'
import { sql_config } from '../../connection.js'
import Course from '../course.model.js'
import Employee from '../employee.mode.js'

const TeachersCourses = sql_config.define(
  'tbl_teachersCourse',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teacherId: {
      type: DataTypes.UUID,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id',
      },
    },
  },
  { timestamps: true, paranoid: true }
)

export default TeachersCourses
