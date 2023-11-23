// service.js

const data = require("../Data/Applications");

/**
 * Create a new application from a guest user
 * @param {Object} application - The application details
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success and message
 */
async function createApplication(application, status, listingId, user_id) {
  return await data.createApplication(application, status, listingId, user_id);
}

/**
 * Manager can accept or reject applications
 * @param {number} applicationId - The ID of the application
 * @param {string} status - The status (accept or reject)
 * @param {number} user_id - The user ID (manager)
 * @returns {Object} - Object containing success, message, and additional notifications
 */
async function updateStatusApplication(applicationId, status, user_id) {
  const value = await data.updateStatusApplication(applicationId, status, user_id);
  console.log('in service layer', value)
  return value
}

/**
 * Get all applications for a specific listing
 * @param {number} listingId - The ID of the listing
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success, message, and data
 */
async function getAllApplicationsForListing(listingId, user_id) {
  return await data.getAllApplicationsForListing(listingId, user_id);
}

/**
 * Get a specific application by ID
 * @param {number} applicationId - The ID of the application
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success, message, and data
 */
async function getApplicationById(applicationId, user_id) {
  return await data.getApplicationById(applicationId, user_id);
}

/**
 * Get all applications
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success, message, and data
 */
async function getAllApplications(user_id) {
  return await data.getAllApplications(user_id);
}

module.exports = {
  createApplication,
  updateStatusApplication,
  getAllApplicationsForListing,
  getApplicationById,
  getAllApplications,
};
