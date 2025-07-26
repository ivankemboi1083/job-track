// utils/hashAndStoreUser.js
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Hashes a password and stores the user in the database.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} The created user (without password hash)
 */
async function hashAndStoreUser(username, email, password) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}

module.exports = hashAndStoreUser;

/**
 * Compares a given password with the hashed password in the database for a user.
 * @param {string} email - The user's email
 * @param {string} password - The plain text password to check
 * @returns {Promise<boolean>} True if the password matches, false otherwise
 */
async function comparePassword(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { passwordHash: true },
  });
  if (!user) return false;
  return bcrypt.compare(password, user.passwordHash);
}

module.exports.comparePassword = comparePassword;
