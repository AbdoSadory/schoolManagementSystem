import { DataTypes } from 'sequelize'
import { sql_config } from '../connection.js'
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
      values: [
        'english',
        'french',
        'history',
        'mathmatics',
        'statistics',
        'physics',
        'chemistry',
        'biology',
        'zoology',
        'computer science',
        'art',
        'music',
      ],
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
      values: [
        'languages',
        'history',
        'science',
        'mathematics',
        'sports',
        'art',
        'technology',
        'music',
      ],
      allowNull: false,
    },
    grade: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
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

export default Course
