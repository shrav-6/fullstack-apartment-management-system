const { buildings, managers, tenants, users, listings } = require("../Models");

/**
 * Get a building by ID based on user role.
 *
 * @async
 * @function
 * @param {number} buildingId - The ID of the building.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<Object|null>} - The building or null if not found.
 * @throws {Error} - If an error occurs during the process.
 */
async function getBuildingById(buildingId, role, user_id) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      if (manager) {
        const building = await buildings.findOne({ where: { id: buildingId, managerId: manager.id } });
        return building ? building : null;
      } else {
        return null; // Manager not found
      }
    } else {
      return null; // Invalid role
    }
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
 * @param {string} role - The role of the user (e.g., "Manager").
 * @param {number} user_id - The ID of the user.
 * @returns {Promise<Array<Object>|null>} - Array of buildings or null if not found.
 * @throws {Error} - If an error occurs during the process.
 */
async function getAllBuildings(role, user_id) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      if (manager) {
        const buildingsList = await buildings.findAll({ where: { managerId: manager.id } });
        return buildingsList ? buildingsList : null;
      } else {
        return null; // Manager not found
      }
    } else {
      return null; // Invalid role
    }
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
 * @param {number} user_id - The ID of the user.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @param {string} buildingName - The name of the building.
 * @returns {Promise<boolean>} - True if the building is created successfully, false otherwise.
 * @throws {Error} - If an error occurs during the process.
 */
async function createBuilding(data, user_id, role, buildingName) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      if (manager) {
        const existingBuilding = await buildings.findOne({ where: { managerId: manager.id, buildingName: buildingName } });

        if (existingBuilding == null) {
          await buildings.create({
            buildingName: buildingName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            managerId: manager.id,
          });
          return true; // Building created successfully
        } else {
          return false; // Building with the same name already exists
        }
      } else {
        return false; // Manager not found
      }
    } else {
      return false; // Invalid role
    }
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
 * @param {number} buildingId - The ID of the building to delete.
 * @param {number} user_id - The ID of the user.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<boolean>} - True if the building is deleted successfully, false otherwise.
 * @throws {Error} - If an error occurs during the process.
 */
async function deleteBuilding(buildingId, user_id, role) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      if (manager) {
        const building = await buildings.findOne({ where: { id: buildingId, managerId: manager.id } });

        if (building) {
          await buildings.destroy({
            where: {
              id: buildingId,
            },
          });
          return true; // Building deleted successfully
        } else {
          return false; // Building not found
        }
      } else {
        return false; // Manager not found
      }
    } else {
      return false; // Invalid role
    }
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
 * @param {number} buildingId - The ID of the building to update.
 * @param {string} buildingName - The updated name of the building.
 * @param {string} address - The updated address of the building.
 * @param {string} phoneNumber - The updated phone number of the building.
 * @param {number} user_id - The ID of the user.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<boolean>} - True if the building is updated successfully, false otherwise.
 * @throws {Error} - If an error occurs during the process.
 */
async function updateBuilding(buildingId, buildingName, address, phoneNumber, user_id, role) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      if (manager) {
        const building = await buildings.findOne({ where: { id: buildingId, managerId: manager.id } });

        if (building) {
          await buildings.update(
            { buildingName: buildingName, address: address, phoneNumber: phoneNumber },
            { where: { id: buildingId } }
          );
          return true; // Building updated successfully
        } else {
          return false; // Building not found
        }
      } else {
        return false; // Manager not found
      }
    } else {
      return false; // Invalid role
    }
  } catch (error) {
    console.error("Error in updateBuilding:", error);
    throw error;
  }
}

/**
 * Get all buildings for signup field data.
 *
 * @async
 * @function
 * @returns {Promise<Array<Object>|null>} - Array of building names or null if not found.
 * @throws {Error} - If an error occurs during the process.
 */
async function getAllBuildingsForSignUp() {
  try {
    // Retrieve buildings for managers
    const buildingNames = await buildings.findAll({
      attributes: ['buildingName'],
    });
    return buildingNames ? buildingNames : null;
  } catch (error) {
    console.error("Error in getAllBuildings:", error);
    throw error;
  }
}

async function getBuildingInfo(user_id) {
  try {
  //console.log('in building info');
    const role= await getRoleByUserId(user_id);
    //const user_id=req.user.id;
    console.log('inside building info API', user_id);
    const tenant = await tenants.findOne({ where: { userId: user_id } });  
    //console.log('backend tenant', tenant);  
    if (tenant) {
      const building = await buildings.findOne({ where: { id: tenant.buildingId } });
      //console.log('building', building);
    
      const apartmentNumber = tenant.apartmentNumber;
      const buildingName = building.buildingName;
      
      const buildingPhoneNumber = building.phoneNumber;
      const listingId = tenant.listingId;
      //console.log('listingId', listingId);
      const listing = await listings.findOne({where: {id: listingId}});
      const manager = await managers.findOne({where: {id: listing.managerId}});
      const managerName = manager.name;
      //console.log('listing detail:', listing);
      const address = listing.address;
      const rent = listing.rent;
      const unit = listing.unitAvailable;
      const startsFrom = listing.startsFrom;
      const description = listing.description;
      const extras = listing.extras;
      const pets = listing.pets;
      const returnData = [apartmentNumber, buildingName, address, buildingPhoneNumber, rent, unit, startsFrom, description, extras, pets, managerName]
      console.log('returnData', returnData);
      return {
        "success": true,
        "message": "Retrieved successfully",
        "data": returnData
      };
      //return returnData;
    } else {
      return {
        "success": false,
        "error": "Tenant not found"
      };
    }
  } catch (error) {
    console.error("Error in gettting building info:", error);
    throw error;
  }
}

/**
 * Get user role by user ID
 * @param {number} user_id - The user ID
 * @returns {string} - The user role
 */
async function getRoleByUserId(user_id) {
  const user = await users.findOne({ where: { id: user_id } });
  return user ? user.role : null;
}

// Export the functions for use in other files
module.exports = {
  getBuildingById,
  getAllBuildings,
  createBuilding,
  deleteBuilding,
  updateBuilding,
  getAllBuildingsForSignUp,
  getRoleByUserId,
  getBuildingInfo,
};
