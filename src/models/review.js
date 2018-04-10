import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

const reviewModel = sequelize.define('review', {
  homeworkId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  },
  reviewerId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  },
  reviewerUsername: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  reviewerFullname: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  reviewerRole: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  revieweeId: {
    type: Sequelize.BIGINT(20),
    allowNull: false,
    primaryKey: true
  },
  revieweeUsername: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  revieweeFullname: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  comment: {
    type: Sequelize.STRING(256),
    allowNull: true
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default reviewModel
