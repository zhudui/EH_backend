import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

const userClassModel = sequelize.define('user_class', {
  userId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  },
  classId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default userClassModel
