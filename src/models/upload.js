import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

const uploadModel = sequelize.define('upload', {
  homeworkId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  },
  filePath: {
    type: Sequelize.STRING(256),
    allowNull: false
  },
  userRole: {
    type: Sequelize.STRING(20)
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default uploadModel
