import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
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
      values: ['first', 'second', 'summer'],
      required: true,
      allowNull: false,
    },
    oral: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    practical: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    practical: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    midterm: {
      type: DataTypes.FLOAT,
      required: true,
      allowNull: false,
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
