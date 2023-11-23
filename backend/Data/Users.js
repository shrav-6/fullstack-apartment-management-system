const { users, tenants, managers, buildings, guests } = require("../models");
const bcrypt = require("bcrypt");

/**
 * Get a user by email.
 *
 * @async
 * @function
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<?Object>} - The user object or null if not found.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function getUserByEmail(email) {
  try {
    const user = await users.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw error;
  }
}

/**
 * Create a new user.
 *
 * @async
 * @function
 * @param {Object} userData - The data for creating a new user.
 * @param {string} userData.userName - The username of the new user.
 * @param {string} userData.email - The email of the new user.
 * @param {string} userData.password - The password of the new user.
 * @param {string} userData.role - The role of the new user.
 * @returns {Promise<?Object>} - The created user object or null if creation fails.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function createUser({ userName, email, password, role }) {
  try {
    // Hash the user's password before storing it
    const hash = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await users.create({
      userName: userName,
      password: hash,
      email: email,
      role: role,
    });

    return newUser;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}

// Export the functions for use in other files
module.exports = {
  getUserByEmail,
  createUser,
};
