import { DataTypes } from 'sequelize'
import { sql_config } from '../../connection.js'
import Employee from '../employee.mode.js'
import ClassRoom from '../classRoom.model.js'

const TeachersClassRooms = sql_config.define(
  'tbl_teachersClassRoom',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teacherId: {
      type: DataTypes.INTEGER,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    classRoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: ClassRoom,
        key: 'id',
      },
    },
  },
  { timestamps: true, paranoid: true }
)

export default TeachersClassRooms
