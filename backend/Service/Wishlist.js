// service.js
const { validateToken } = require("../Middleware/Middleware");
const dataLayer = require("../Data/WishList");

/**
 * Get wishlisted listings for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - Sends a JSON response.
 */
async function getWishlistedListings(req, res) {
  try {
    const user = req.user;
    const userWishlists = await dataLayer.getUserWishlists(user.id);
    const uniqueListingIds = await dataLayer.getUniqueListingIds(userWishlists);
    const retrievedListings = await dataLayer.getListingsByUniqueIds(uniqueListingIds);

    if (retrievedListings.length > 0) {
      const responseData = retrievedListings.map((listing) => ({
        id: listing.id,
        unitAvailable: listing.unitAvailable,
        rent: listing.rent,
        address: listing.address,
        pets: listing.pets,
        startsFrom: listing.startsFrom,
        description: listing.description,
        extras: listing.extras,
        buildingName: listing.building ? listing.building.buildingName : null,
      }));

      res.json({
        success: true,
        message: "Retrieved successfully",
        data: responseData,
      });
    } else {
      res.json({
        success: false,
        error: "No listings found or user doesn't have wishlisted properties",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      error: "An error occurred while retrieving data",
    });
  }
}

/**
 * Add a wishlist item for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - Sends a JSON response.
 */
async function addWishlistItem(req, res) {
  try {
    const { listingId, status } = req.body;
    const user_id = req.user.id;
    const listing = await dataLayer.findListingById(listingId);

    if (listing && status === true) {
      await dataLayer.createWishlistItem(user_id, listingId, status);

      res.json({
        success: true,
        message: "Successfully wishlisted",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Listing not found or invalid status",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while processing the request",
    });
  }
}

/**
 * Remove a wishlist item for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void} - Sends a JSON response.
 */
async function removeWishlistItem(req, res) {
  try {
    const { listingId, status } = req.body;
    const user_id = req.user.id;
    const wishlistItem = await dataLayer.findWishlistItem(user_id, listingId);

    if (wishlistItem) {
      await dataLayer.removeWishlistItem(user_id, listingId);

      res.json({
        success: true,
        message: "Successfully removed from wishlist",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Wishlist item not found or unauthorized to delete",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while processing the request",
    });
  }
}

module.exports = {
  getWishlistedListings,
  addWishlistItem,
  removeWishlistItem,
};
