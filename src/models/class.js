import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

const classModel = sequelize.define('class', {
  id: {
    type: Sequelize.BIGINT(20),
    unique: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(128),
    allownull: false
  },
  teacherName: {
    type: Sequelize.STRING(45),
    allownull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default classModel