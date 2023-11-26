const data = require("../data/Notices");

/**
 * Get a notice by ID based on user role.
 *
 * @async
 * @function
 * @param {string} noticeId - The ID of the notice to retrieve.
 * @param {string} role - The role of the user making the request.
 * @param {string} user_id - The ID of the user making the request.
 * @returns {Promise<?Object>} - The notice object or null if not found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getNoticeById(noticeId, role, user_id) {
  try {
    return await data.getNoticeById(noticeId, role, user_id);
  } catch (error) {
    console.error("Error in getNoticeById:", error);
    throw error;
  }
}

/**
 * Get all notices for a tenant based on user role.
 *
 * @async
 * @function
 * @param {string} role - The role of the user making the request.
 * @param {string} user_id - The ID of the user making the request.
 * @returns {Promise<?Array>} - An array of notice objects or null if none found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getAllNoticesTenant(role, user_id) {
  try {
    return await data.getAllNoticesTenant(role, user_id);
  } catch (error) {
    console.error("Error in getAllNoticesTenant:", error);
    throw error;
  }
}

/**
 * Get all notices for a manager based on user role and buildingId.
 *
 * @async
 * @function
 * @param {string} role - The role of the user making the request.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} buildingId - The ID of the building for which notices are requested.
 * @returns {Promise<?Array>} - An array of notice objects or null if none found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getAllNoticesManager(role, user_id, buildingId) {
  try {
    return await data.getAllNoticesManager(role, user_id, buildingId);
  } catch (error) {
    console.error("Error in getAllNoticesManager:", error);
    throw error;
  }
}

/**
 * Create a new notice based on user role and buildingName.
 *
 * @async
 * @function
 * @param {Object} notice - The data for creating a new notice.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @param {string} buildingName - The name of the building.
 * @returns {Promise<boolean>} - True if the notice is created successfully, false otherwise.
 * @throws {Error} - If an error occurs during the notice creation.
 */
async function createNotice(notice, user_id, role, buildingName,priority) {
  try {
    return await data.createNotice(notice, user_id, role, buildingName,priority);
  } catch (error) {
    console.error("Error in createNotice:", error);
    throw error;
  }
}

/**
 * Delete a notice based on user role.
 *
 * @async
 * @function
 * @param {string} noticeId - The ID of the notice to delete.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<boolean>} - True if the notice is deleted successfully, false otherwise.
 * @throws {Error} - If an error occurs during the notice deletion.
 */
async function deleteNotice(noticeId, user_id, role) {
  try {
    return await data.deleteNotice(noticeId, user_id, role);
  } catch (error) {
    console.error("Error in deleteNotice:", error);
    throw error;
  }
}

/**
 * Update a notice based on user role.
 *
 * @async
 * @function
 * @param {string} noticeId - The ID of the notice to update.
 * @param {string} title - The updated title of the notice.
 * @param {string} description - The updated description of the notice.
 * @param {string} dateAndTime - The updated date and time of the notice.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<boolean>} - True if the notice is updated successfully, false otherwise.
 * @throws {Error} - If an error occurs during the notice update.
 */
async function updateNotice(noticeId, title, description, dateAndTime, user_id, role) {
  try {
    return await data.updateNotice(noticeId, title, description, dateAndTime, user_id, role);
  } catch (error) {
    console.error("Error in updateNotice:", error);
    throw error;
  }
}

// Export the functions for use in other files
module.exports = {
  getNoticeById,
  getAllNoticesTenant,
  getAllNoticesManager,
  createNotice,
  deleteNotice,
  updateNotice,
};
