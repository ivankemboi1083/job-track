const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Job = sequelize.define("Job", {
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    url: DataTypes.STRING,
    source: DataTypes.STRING,
    description: DataTypes.TEXT,
    salary: DataTypes.STRING,
    jobType: DataTypes.STRING,
    isRemote: DataTypes.BOOLEAN,
    externalId: { type: DataTypes.STRING, unique: true },
    userId: DataTypes.INTEGER, // For tracking applications
    status: { type: DataTypes.STRING, defaultValue: "saved" }, // saved/applied/interview/offer/rejected
    notes: DataTypes.TEXT,
  });

  return Job;
};
