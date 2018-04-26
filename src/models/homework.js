import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

const homeworkModel = sequelize.define('homework', {
  id: {
    type: Sequelize.BIGINT(20),
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(48),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(2000)
  },
  courseId: {
    type: Sequelize.BIGINT(20),
    allowNull: false
  },
  startTime: {
    type: Sequelize.STRING(48),
    allowNull: false
  },
  endTime: {
    type: Sequelize.STRING(48),
    allowNull: false
  },
  filePath: {
    type: Sequelize.STRING(256)
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default homeworkModel
