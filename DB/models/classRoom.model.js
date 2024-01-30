import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'

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
      values: ['first', 'second', 'summer'],
      required: true,
      allowNull: false,
    },
    grade: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
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
      values: ['offline', 'online', 'hybrid'],
      required: true,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true }
)

export default ClassRoom
