import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

const userModel = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  fullname: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(48),
    allowNull: true
  },
  role: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default userModel
