const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    passwordHash: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: "user" },
    resumeUrl: DataTypes.STRING,
  });

  // Simple password check (replace with hash check in production)
  User.prototype.checkPassword = function (password) {
    return Promise.resolve(this.passwordHash === password);
  };

  return User;
};
