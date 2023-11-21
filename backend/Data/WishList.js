// data-layer.js
const { wishlists, listings, buildings } = require("../Models");

/**
 * Get wishlists of the corresponding user, including associated listings and buildings.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} - Array of user's wishlists with associated listings and buildings.
 */
async function getUserWishlists(userId) {
  return await wishlists.findAll({
    where: { userId: userId },
    include: [{ model: listings, include: buildings }],
  });
}

/**
 * Get unique listing IDs from an array of wishlists.
 * @param {Array} userWishlists - Array of user's wishlists.
 * @returns {Array} - Array of unique listing IDs.
 */
async function getUniqueListingIds(userWishlists) {
  return [...new Set(userWishlists.map((wishlist) => wishlist.listingId))];
}

/**
 * Retrieve listings based on unique IDs and include the building.
 * @param {Array} uniqueListingIds - Array of unique listing IDs.
 * @returns {Promise<Array>} - Array of retrieved listings with included buildings.
 */
async function getListingsByUniqueIds(uniqueListingIds) {
  return await listings.findAll({
    where: { id: uniqueListingIds },
    include: buildings,
  });
}

/**
 * Create a wishlist item for a user.
 * @param {number} userId - The ID of the user.
 * @param {number} listingId - The ID of the listing to be wishlisted.
 * @param {boolean} status - The status of the wishlist item.
 * @returns {Promise<Object>} - The created wishlist item.
 */
async function createWishlistItem(userId, listingId, status) {
  return await wishlists.create({
    status,
    listingId,
    userId,
  });
}

/**
 * Find a listing by its ID.
 * @param {number} listingId - The ID of the listing to find.
 * @returns {Promise<Object|null>} - The found listing or null if not found.
 */
async function findListingById(listingId) {
  return await listings.findOne({ where: { id: listingId } });
}

/**
 * Find a wishlist item by user ID and listing ID.
 * @param {number} userId - The ID of the user.
 * @param {number} listingId - The ID of the listing.
 * @returns {Promise<Object|null>} - The found wishlist item or null if not found.
 */
async function findWishlistItem(userId, listingId) {
  return await wishlists.findOne({ where: { listingId, userId } });
}

/**
 * Remove a wishlist item by user ID and listing ID.
 * @param {number} userId - The ID of the user.
 * @param {number} listingId - The ID of the listing.
 * @returns {Promise<void>} - Promise indicating the completion of the removal.
 */
async function removeWishlistItem(userId, listingId) {
  await wishlists.destroy({ where: { listingId, userId } });
}

module.exports = {
  getUserWishlists,
  getUniqueListingIds,
  getListingsByUniqueIds,
  createWishlistItem,
  findListingById,
  findWishlistItem,
  removeWishlistItem,
};
