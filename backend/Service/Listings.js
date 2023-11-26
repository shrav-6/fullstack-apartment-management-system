const dataLayer = require("../data/Listings");

/**
 * Create a new listing for a manager.
 *
 * @async
 * @function
 * @param {Object} listing - The data for creating a new listing.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @param {string} buildingName - The name of the building.
 * @returns {Promise<boolean>} - True if the listing is created successfully, false otherwise.
 * @throws {Error} - If an error occurs during the listing creation.
 */
async function createListing(listing, user_id, role, buildingName) {
  return await dataLayer.createListing(listing, user_id, role, buildingName);
}

/**
 * Get all listings for a specific building.
 *
 * @async
 * @function
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} buildingId - The ID of the building for which listings are requested.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<?Array>} - An array of listing objects or null if none found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getAllListingsForBuilding(user_id, buildingId, role) {
  // Note: In the original code, there is no 'buildingId' defined, so assuming 'buildingName' is intended
  return await dataLayer.getAllListingsForBuilding(user_id, buildingId, role);
}

/**
 * Get all listings for public view.
 *
 * @async
 * @function
 * @returns {Promise<?Array>} - An array of listing objects or null if none found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getAllListingsForPublicView() {
  return await dataLayer.getAllListingsForPublicView();
}

/**
 * Get a particular listing based on listingId.
 *
 * @async
 * @function
 * @param {string} listingId - The ID of the listing to retrieve.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<?Object>} - The listing object or null if not found.
 * @throws {Error} - If an error occurs during the data retrieval.
 */
async function getListingById(listingId, user_id, role) {
  return await dataLayer.getListingById(listingId, user_id, role);
}

/**
 * Update a particular listing based on listingId.
 *
 * @async
 * @function
 * @param {string} listingId - The ID of the listing to update.
 * @param {Object} data - The data for updating the listing.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<boolean>} - True if the listing is updated successfully, false otherwise.
 * @throws {Error} - If an error occurs during the listing update.
 */
async function updateListing(listingId, data, user_id, role) {
  return await dataLayer.updateListing(listingId, data, user_id, role);
}

/**
 * Delete a listing based on listingId.
 *
 * @async
 * @function
 * @param {string} listingId - The ID of the listing to delete.
 * @param {string} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user making the request.
 * @returns {Promise<boolean>} - True if the listing is deleted successfully, false otherwise.
 * @throws {Error} - If an error occurs during the listing deletion.
 */
async function deleteListing(listingId, user_id, role) {
  return await dataLayer.deleteListing(listingId, user_id, role);
}

module.exports = {
  createListing,
  getAllListingsForBuilding,
  getAllListingsForPublicView,
  getListingById,
  updateListing,
  deleteListing,
};
