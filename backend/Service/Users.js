const dataLayer = require("../Data/Users");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { managers, buildings, tenants, guests } = require("../Models");

/**
 * Sign up a new user based on provided data.
 *
 * @async
 * @function
 * @param {Object} userData - User data for sign up.
 * @param {string} userData.userName - User's username.
 * @param {string} userData.email - User's email.
 * @param {string} userData.name - User's name.
 * @param {string} userData.password - User's password.
 * @param {string} userData.role - User's role (e.g., "Tenant", "Manager", "Guest").
 * @param {string} userData.phoneNumber - User's phone number.
 * @param {string} userData.address - User's address.
 * @param {string} userData.buildingName - Name of the building for tenants.
 * @param {string} userData.apartmentNumber - Apartment number for tenants.
 * @returns {Promise<Object>} - Object indicating success, error, and user data.
 * @throws {Error} - If an error occurs during the sign-up process.
 */
async function signUpUser({
  userName,
  email,
  name,
  password,
  role,
  phoneNumber,
  address,
  buildingName,
  apartmentNumber,
}) {
  try {
    const existingUser = await dataLayer.getUserByEmail(email);

    if (existingUser) {
      return { success: false, error: "Email is already registered" };
    }

    let newUser;
    if (role === "Tenant") {
      const building = await buildings.findOne({ where: { buildingName: buildingName } });
      const manager = await managers.findOne({ where: { id: building.managerId } });

      if (manager && building) {
        const user = await dataLayer.createUser({ userName, email, password, role });
        const tenant = { name, phoneNumber, address, managerId: manager.id, buildingId: building.id, apartmentNumber, userId: user.id };
        await tenants.create(tenant);
        newUser = user;
      } else {
        return { success: false, error: "Not successful, invalid building name" };
      }
    } else if (role === "Manager" || role === "Guest") {
      const user = await dataLayer.createUser({ userName, email, password, role });

      if (role === "Manager") {
        const manager = { name, phoneNumber, address, userId: user.id };
        await managers.create(manager);
      } else if (role === "Guest") {
        const guest = { name, phoneNumber, userId: user.id };
        await guests.create(guest);
      }

      newUser = user;
    } else {
      return { success: false, error: "Not successful, no specific roles" };
    }

    return { success: true, data: "User profile created successfully", user: newUser };
  } catch (error) {
    console.error("Error in signUpUser:", error);
    throw error;
  }
}

/**
 * Log in a user based on provided credentials.
 *
 * @async
 * @function
 * @param {Object} credentials - User login credentials.
 * @param {string} credentials.email - User's email.
 * @param {string} credentials.password - User's password.
 * @returns {Promise<Object>} - Object indicating success, error, and user data or access token.
 * @throws {Error} - If an error occurs during the login process.
 */
async function loginUser({ email, password }) {
  try {
    const user = await dataLayer.getUserByEmail(email);

    if (!user) {
      return { success: false, error: "User is not registered" };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { success: false, error: "Wrong Username And Password Combination" };
    }

    const accessToken = sign(
      { username: user.username, id: user.id, email: user.email, role: user.role },
      "importantsecret"
    );

    return {
      success: true,
      token: accessToken,
      email: user.email,
      id: user.id,
      username: user.userName,
      role: user.role,
    };
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error;
  }
}

module.exports = {
  signUpUser,
  loginUser,
};
