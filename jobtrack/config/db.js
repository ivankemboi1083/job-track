const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'job_tracker',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Import models
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const SavedJob = require('../models/SavedJob');

// Define relationships
User.hasMany(Application);
Application.belongsTo(User);

User.hasMany(SavedJob);
SavedJob.belongsTo(User);

Job.hasMany(Application);
Application.belongsTo(Job);

Job.hasMany(SavedJob);
SavedJob.belongsTo(Job);

// Sync all models
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = sequelize;
