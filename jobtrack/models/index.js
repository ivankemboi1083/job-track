const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

const User = require("./user")(sequelize);
const Job = require("./job")(sequelize);

User.hasMany(Job, { foreignKey: "userId" });
Job.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Job };
