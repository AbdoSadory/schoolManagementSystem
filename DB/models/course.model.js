import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
import {
  courseSpecializationEnum,
  courseTitleEnum,
  gradeEnum,
  learningModeEnum,
} from '../../src/utils/generalConstants.js'
const Course = sql_config.define(
  'tbl_course',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.ENUM,
      required: true,
      values: courseTitleEnum,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      required: true,
      defaultValue: 'No Description Yet',
    },
    specialization: {
      type: DataTypes.ENUM,
      required: true,
      values: courseSpecializationEnum,
      allowNull: false,
    },
    grade: {
      type: DataTypes.ENUM,
      values: gradeEnum,
      required: true,
      allowNull: false,
    },
    learningMode: {
      type: DataTypes.ENUM,
      values: learningModeEnum,
      required: true,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
)

export default Course
