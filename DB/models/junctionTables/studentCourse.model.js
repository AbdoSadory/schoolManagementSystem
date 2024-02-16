import { DataTypes } from 'sequelize'
import { sql_config } from '../../connection.js'
import Course from '../course.model.js'
import Student from '../student.model.js'

const StudentsCourses = sql_config.define(
  'tbl_studentsCourse',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tblStudentId: {
      type: DataTypes.UUID,
      references: {
        model: Student,
        key: 'id',
      },
    },
    tblCourseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Course,
        key: 'id',
      },
    },
  },
  { timestamps: true, paranoid: true }
)

export default StudentsCourses
