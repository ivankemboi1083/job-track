const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  remoteId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  jobType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  applyUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  salary: {
    type: DataTypes.STRING,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true
  },
  postedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Job; 