// Import required models
const { notices, managers, tenants, buildings, users } = require("../models");

/**
 * Get a notice by ID based on user role.
 *
 * @async
 * @function
 * @param {number} noticeId - The ID of the notice to retrieve.
 * @param {string} role - The role of the user (e.g., "Manager" or "Tenant").
 * @param {number} user_id - The ID of the user making the request.
 * @returns {Promise<?Object>} - The notice object or null if not found.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function getNoticeById(noticeId, role, user_id) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });

      if (manager) {
        const notice = await notices.findOne({ where: { id: noticeId, managerId: manager.id } });

        if (notice) {
          return notice; // Notice found successfully
        } else {
          return null; // Notice not found
        }
      } else {
        return null; // Manager not found
      }
    } else if (role === "Tenant") {
      const tenant = await tenants.findOne({ where: { userId: user_id } });

      if (tenant) {
        const building_id = tenant.buildingId;
        const notice = await notices.findOne({ where: { id: noticeId, buildingId: building_id } });

        if (notice) {
          return notice; // Notice found successfully
        } else {
          return null; // Notice not found
        }
      } else {
        return null; // Tenant not found
      }
    } else {
      return null; // Invalid role
    }
  } catch (error) {
    console.error("Error in getNoticeById:", error);
    throw error;
  }
}

/**
 * Get all notices based on user role (for Tenants).
 *
 * @async
 * @function
 * @param {string} role - The role of the user (e.g., "Tenant").
 * @param {number} user_id - The ID of the user making the request.
 * @returns {Promise<?Array>} - An array of notices for the specified user or null if not found.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function getAllNoticesTenant(role, user_id) {
  try {
    if (role === "Tenant") {
      const tenant = await tenants.findOne({ where: { userId: user_id } });

      if (tenant) {
        const building_id = tenant.buildingId;
        const noticesList = await notices.findAll({ where: { buildingId: building_id } });

        if (noticesList && noticesList.length > 0) {
          return noticesList; // Notices found successfully
        } else {
          return null; // No notices found
        }
      } else {
        return null; // Tenant not found
      }
    } else {
      return null; // Invalid role
    }
  } catch (error) {
    console.error("Error in getAllNoticesTenant:", error);
    throw error;
  }
}

/**
 * Get all notices based on user role (for Managers) and building ID.
 *
 * @async
 * @function
 * @param {string} role - The role of the user (e.g., "Manager").
 * @param {number} user_id - The ID of the user making the request.
 * @param {number} buildingId - The ID of the building for which to retrieve notices.
 * @returns {Promise<?Array>} - An array of notices for the specified building or null if not found.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function getAllNoticesManager(role, user_id, buildingId) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });

      if (manager) {
        const noticesList = await notices.findAll({ where: { buildingId: buildingId } });

        if (noticesList && noticesList.length > 0) {
          return noticesList; // Notices found successfully
        } else {
          return null; // No notices found
        }
      } else {
        return null; // Tenant not found
      }
    } else {
      return null; // Invalid role
    }
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
 * @param {number} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @param {string} buildingName - The name of the building.
 * @returns {Promise<boolean>} - True if the notice is created successfully, false otherwise.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function createNotice(notice, user_id, role, buildingName) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });

      if (manager) {
        const building = await buildings.findOne({ where: { managerId: manager.id, buildingName: buildingName } });

        if (manager && building) {
          await notices.create({
            title: notice.title,
            description: notice.description,
            dateAndTime: notice.dateAndTime,
            buildingId: building.id,
            managerId: manager.id,
            priority:notice.priority,
          });
          return true; // Notice created successfully
        } else {
          return false; // Manager or building not found
        }
      } else {
        return false; // Manager not found
      }
    } else {
      return false; // Invalid role
    }
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
 * @param {number} noticeId - The ID of the notice to delete.
 * @param {number} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<boolean>} - True if the notice is deleted successfully, false otherwise.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function deleteNotice(noticeId, user_id, role) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });

      if (manager) {
        const notice = await notices.findOne({ where: { id: noticeId, managerId: manager.id } });

        if (notice) {
          await notices.destroy({
            where: {
              id: noticeId,
            },
          });
          return true; // Notice deleted successfully
        } else {
          return false; // Notice not found
        }
      } else {
        return false; // Manager not found
      }
    } else {
      return false; // Invalid role
    }
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
 * @param {number} noticeId - The ID of the notice to update.
 * @param {string} title - The updated title of the notice.
 * @param {string} description - The updated description of the notice.
 * @param {string} dateAndTime - The updated date and time of the notice.
 * @param {number} user_id - The ID of the user making the request.
 * @param {string} role - The role of the user (e.g., "Manager").
 * @returns {Promise<boolean>} - True if the notice is updated successfully, false otherwise.
 * @throws {Error} - If an error occurs during the database operation.
 */
async function updateNotice(noticeId, title, description, dateAndTime, user_id, role,priority) {
  try {
    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });

      if (manager) {
        const notice = await notices.findOne({ where: { id: noticeId, managerId: manager.id } });

        if (notice) {
          await notices.update(
            { title: title, description: description, dateAndTime: dateAndTime,priority:priority},
            { where: { id: noticeId } }
          );
          return true; // Notice updated successfully
        } else {
          return false; // Notice not found
        }
      } else {
        return false; // Manager not found
      }
    } else {
      return false; // Invalid role
    }
  } catch (error) {
    console.error("Error in updateNotice:", error);
    throw error;
  }
}

// Export the functions for use in other files
module.exports = {
  getNoticeById,
  getAllNoticesTenant,
  createNotice,
  deleteNotice,
  updateNotice,
  getAllNoticesManager,
};
