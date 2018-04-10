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
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default uploadModel
