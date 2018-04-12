import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

const userCourseModel = sequelize.define('user_course', {
  userId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  },
  courseId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default userCourseModel
