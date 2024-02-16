import { DataTypes } from 'sequelize'
import { sql_config } from '../../connection.js'
import Student from '../student.model.js'
import ClassRoom from '../classRoom.model.js'

const StudentsClassRooms = sql_config.define(
  'tbl_studentsClassRoom',
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
    tblClassRoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: ClassRoom,
        key: 'id',
      },
    },
  },
  { timestamps: true, paranoid: true }
)

export default StudentsClassRooms
