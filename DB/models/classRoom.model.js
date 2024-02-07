import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
import {
  gradeEnum,
  learningModeEnum,
  termEnum,
} from '../../src/utils/generalConstants.js'

const ClassRoom = sql_config.define(
  'tbl_classRoom',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    term: {
      type: DataTypes.ENUM,
      values: termEnum,
      required: true,
      allowNull: false,
    },
    grade: {
      type: DataTypes.ENUM,
      values: gradeEnum,
      required: true,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
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

export default ClassRoom
