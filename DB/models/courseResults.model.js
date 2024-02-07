import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
import { termEnum } from '../../src/utils/generalConstants.js'
const CourseResults = sql_config.define(
  'tbl_courseResult',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    term: {
      type: DataTypes.ENUM,
      values: termEnum,
      required: true,
      allowNull: false,
    },
    oral: {
      type: DataTypes.FLOAT,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    practical: {
      type: DataTypes.FLOAT,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    midterm: {
      type: DataTypes.FLOAT,
      required: true,
      allowNull: false,
      defaultValue: 0,
    },
    final: {
      type: DataTypes.FLOAT,
      required: true,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
)

export default CourseResults
