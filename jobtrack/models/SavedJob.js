const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SavedJob = sequelize.define('SavedJob', {
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
  savedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Ensure a user can't save the same job multiple times
SavedJob.addHook('beforeCreate', async (savedJob) => {
  const existing = await SavedJob.findOne({
    where: {
      userId: savedJob.userId,
      jobId: savedJob.jobId
    }
  });
  if (existing) {
    throw new Error('Job already saved by user');
  }
});

module.exports = SavedJob; 