const { listings, managers, buildings } = require("../Models");

/**
 * Create a new listing for a manager.
 *
 * @async
 * @function
 * @param {Object} listing - The data for creating a new listing.
 * @param {number} user_id - The ID of the user.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @param {string} buildingName - The name of the building.
 * @returns {Promise<boolean>} - True if the listing is created successfully, false otherwise.
 * @throws {Error} - If an error occurs during the process.
 */
async function createListing(listing, user_id, role, buildingName) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const building = await buildings.findOne({ where: { managerId: manager.id, buildingName: buildingName } });

      // Check if both manager and building exist
      if (manager && building) {
        await listings.create({
          unitAvailable: listing.unitAvailable,
          rent: listing.rent,
          address: listing.address,
          pets: listing.pets,
          startsFrom: listing.startsFrom,
          description: listing.description,
          extras: listing.extras,
          buildingId: building.id,
          managerId: manager.id,
        });
        return true; // Listing created successfully
      } else {
        return false; // Manager or building not found
      }
    } else {
      return false; // User is not a manager
    }
  } catch (error) {
    console.error("Error in createListing:", error);
    throw error;
  }
}

/**
 * Get all listings for one building.
 *
 * @async
 * @function
 * @param {number} user_id - The ID of the user.
 * @param {number} buildingId - The ID of the building.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<Array<Object>|null>} - Array of listings or null if not found.
 * @throws {Error} - If an error occurs during the process.
 */
async function getAllListingsForBuilding(user_id, buildingId, role) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const listingsData = await listings.findAll({ where: { managerId: manager.id, buildingId: buildingId } });

      // Check if both manager and listings exist
      if (manager && listingsData) {
        return listingsData;
      } else {
        return null; // Manager or listings not found
      }
    } else {
      return null; // User is not a manager
    }
  } catch (error) {
    console.error("Error in getAllListingsForBuilding:", error);
    throw error;
  }
}

/**
 * Get all listings for public view.
 *
 * @async
 * @function
 * @returns {Promise<Array<Object>|null>} - Array of listings for public view or null if not found.
 * @throws {Error} - If an error occurs during the process.
 */
async function getAllListingsForPublicView() {
  try {
    const listingsData = await listings.findAll({
      include: buildings, // Include the Building model in the query
    });

    // Check if listings exist
    if (listingsData.length > 0) {
      const responseData = listingsData.map((listing) => ({
        id: listing.id,
        unitAvailable: listing.unitAvailable,
        rent: listing.rent,
        address: listing.address,
        pets: listing.pets,
        startsFrom: listing.startsFrom,
        description: listing.description,
        extras: listing.extras,
        buildingName: listing.building ? listing.building.buildingName : null, // Access the buildingName from the Building model
      }));
      return responseData;
    } else {
      return null; // No listings found
    }
  } catch (error) {
    console.error("Error in getAllListingsForPublicView:", error);
    throw error;
  }
}

/**
 * Get a particular listing based on listingId.
 *
 * @async
 * @function
 * @param {number} listingId - The ID of the listing.
 * @param {number} user_id - The ID of the user.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<Object|null>} - The listing or null if not found.
 * @throws {Error} - If an error occurs during the process.
 */
async function getListingById(listingId, user_id, role) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const listing = await listings.findOne({ where: { id: listingId, managerId: manager.id } });

      // Check if both manager and listing exist
      if (manager && listing) {
        return listing;
      } else {
        return null; // Manager or listing not found
      }
    } else {
      return null; // User is not a manager
    }
  } catch (error) {
    console.error("Error in getListingById:", error);
    throw error;
  }
}

/**
 * Update a particular listing based on listingId.
 *
 * @async
 * @function
 * @param {number} listingId - The ID of the listing to update.
 * @param {Object} data - The updated data for the listing.
 * @param {number} user_id - The ID of the user.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<boolean>} - True if the listing is updated successfully, false otherwise.
 * @throws {Error} - If an error occurs during the process.
 */
async function updateListing(listingId, data, user_id, role) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const listing = await listings.findOne({ where: { id: listingId, managerId: manager.id } });

      // Check if both manager and listing exist
      if (manager && listing) {
        await listings.update(
          {
            unitAvailable: data.unitAvailable,
            description: data.description,
            startsFrom: data.startsFrom,
            pets: data.pets,
            rent: data.rent,
            address: data.address,
            extras: data.extras,
          },
          { where: { id: listingId } }
        );
        return true; // Listing updated successfully
      } else {
        return false; // Manager or listing not found
      }
    } else {
      return false; // User is not a manager
    }
  } catch (error) {
    console.error("Error in updateListing:", error);
    throw error;
  }
}

/**
 * Delete a listing based on listingId.
 *
 * @async
 * @function
 * @param {number} listingId - The ID of the listing to delete.
 * @param {number} user_id - The ID of the user.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<boolean>} - True if the listing is deleted successfully, false otherwise.
 * @throws {Error} - If an error occurs during the process.
 */
async function deleteListing(listingId, user_id, role) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const listing = await listings.findOne({ where: { id: listingId, managerId: manager.id } });

      // Check if both manager and listing exist
      if (manager && listing) {
        await listings.destroy({
          where: {
            id: listingId,
          },
        });
        return true; // Listing deleted successfully
      } else {
        return false; // Manager or listing not found
      }
    } else {
      return false; // User is not a manager
    }
  } catch (error) {
    console.error("Error in deleteListing:", error);
    throw error;
  }
}

module.exports = {
  createListing,
  getAllListingsForBuilding,
  getAllListingsForPublicView,
  getListingById,
  updateListing,
  deleteListing,
};
