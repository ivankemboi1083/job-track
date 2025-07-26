const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Jobs',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('applied', 'interviewing', 'offer', 'rejected', 'accepted'),
    defaultValue: 'applied'
  },
  appliedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  nextStep: {
    type: DataTypes.STRING,
    allowNull: true
  },
  interviewDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Application; 