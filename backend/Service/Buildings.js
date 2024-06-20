const dataLayer = require("../Data/Buildings");

/**
 * Get a building by ID based on user role.
 *
 * @async
 * @function
 * @param {string} buildingId - The ID of the building to retrieve.
 * @param {string} role - The role of the user making the request.
 * @param {string} user_id - The ID of the user making the request.
 * @returns {Promise<?Object>} - The building object or null if not found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getBuildingById(buildingId, role, user_id) {
  try {
    return await dataLayer.getBuildingById(buildingId, role, user_id);
  } catch (error) {
    console.error("Error in getBuildingById:", error);
    throw error;
  }
}

/**
 * Get all buildings based on user role.
 *
 * @async
 * @function
 * @param {string} role - The role of the user making the request.
 * @param {string} user_id - The ID of the user making the request.
 * @returns {Promise<?Array>} - An array of building objects or null if none found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getAllBuildings(role, user_id) {
  try {
    return await dataLayer.getAllBuildings(role, user_id);
  } catch (error) {
    console.error("Error in getAllBuildings:", error);
    throw error;
  }
}

/**
 * Create a new building based on user role and input data.
 *
 * @async
 * @function
 * @param {Object} data - The data for creating a new building.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @param {string} buildingName - The name of the building.
 * @returns {Promise<boolean>} - True if building created successfully, false otherwise.
 * @throws {Error} - If an error occurs during the building creation.
 */
async function createBuilding(data, user_id, role, buildingName) {
  try {
    return await dataLayer.createBuilding(data, user_id, role, buildingName);
  } catch (error) {
    console.error("Error in createBuilding:", error);
    throw error;
  }
}

/**
 * Delete a building based on user role.
 *
 * @async
 * @function
 * @param {string} buildingId - The ID of the building to delete.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<boolean>} - True if building deleted successfully, false otherwise.
 * @throws {Error} - If an error occurs during the building deletion.
 */
async function deleteBuilding(buildingId, user_id, role) {
  try {
    return await dataLayer.deleteBuilding(buildingId, user_id, role);
  } catch (error) {
    console.error("Error in deleteBuilding:", error);
    throw error;
  }
}

/**
 * Update a building based on user role.
 *
 * @async
 * @function
 * @param {string} buildingId - The ID of the building to update.
 * @param {string} buildingName - The name of the building.
 * @param {string} address - The address of the building.
 * @param {string} phoneNumber - The phone number of the building.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<boolean>} - True if building updated successfully, false otherwise.
 * @throws {Error} - If an error occurs during the building update.
 */
async function updateBuilding(buildingId, buildingName, address, phoneNumber, user_id, role) {
  try {
    return await dataLayer.updateBuilding(buildingId, buildingName, address, phoneNumber, user_id, role);
  } catch (error) {
    console.error("Error in updateBuilding:", error);
    throw error;
  }
}

/**
 * Get all buildings for sign-up.
 *
 * @async
 * @function
 * @returns {Promise<?Array>} - An array of building names or null if none found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getAllBuildingsForSignUp() {
  try {
    return await dataLayer.getAllBuildingsForSignUp();
  } catch (error) {
    console.error("Error in getAllBuildingsForSignUp:", error);
    throw error;
  }
}

async function getBuildingInfo(user_id) {
  const value = await dataLayer.getBuildingInfo(user_id);
  console.log('in service layer', value)
  return value;
}

// Export the functions for use in other files
module.exports = {
  getBuildingById,
  getAllBuildings,
  createBuilding,
  deleteBuilding,
  updateBuilding,
  getAllBuildingsForSignUp,
  getBuildingInfo,
};
