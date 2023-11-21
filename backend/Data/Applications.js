// data.js

const { applications, managers, listings,users } = require("../Models");

/**
 * Create a new application from a guest user
 * @param {Object} application - The application details
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success and message
 */
async function createApplication(application, user_id) {
  try {
    console.log("inside create application");
    const status = "In progress";
    console.log(application);
    console.log(application.listingId);
    const listing = await listings.findOne({ where: { id: application.listingId } });

    if (!listing) {
      return { success: false, error: "You can't apply for this Apartment" };
    }

    await applications.create({
      firstName: application.firstName,
      lastName: application.lastName,
      moveInDate: application.moveInDate,
      needParking: application.needParking,
      email: application.email,
      phoneNumber: application.phoneNumber,
      status: status,
      address: application.address,
      additionalInfo: application.additionalInfo,
      listingId: listing.id,
      userId: user_id,
    });

    return { success: true, message: "Application created successfully, in pending with approval" };
  } catch (error) {
    console.error("Error creating application:", error);
    return { success: false, error: "An error occurred while creating the application" };
  }
}

/**
 * Manager can accept or reject applications
 * @param {number} applicationId - The ID of the application
 * @param {string} status - The status (accept or reject)
 * @param {number} user_id - The user ID (manager)
 * @returns {Object} - Object containing success, message, and additional notifications
 */
async function acceptRejectApplication(applicationId, status, user_id) {
  try {
    if (!(status === "accept" || status === "reject")) {
      return { success: false, error: "Can perform two operations either accept or reject" };
    }

    const role = await getRoleByUserId(user_id);

    if (role !== "Manager") {
      return { success: false, error: "User is not a manager! Only managers can accept/reject applications!" };
    }

    const [manager, application] = await Promise.all([
      managers.findOne({ where: { userId: user_id } }),
      applications.findOne({ where: { id: applicationId, userId: user_id } }),
    ]);

    if (!manager || !application) {
      return { success: false, error: "User is not a manager! Only managers can accept/reject applications!" };
    }

    await applications.update({ status: status }, { where: { id: applicationId } });

    if (status === "accept") {
      // notify guest that application is accepted
      // change role from guest to tenant
    } else {
      // notify tenant that application is rejected
    }

    return { success: true, message: "Updated successfully" };
  } catch (error) {
    console.error("Error accepting/rejecting application:", error);
    return { success: false, error: "An error occurred while updating the application status" };
  }
}

/**
 * Get all applications for a specific listing
 * @param {number} listingId - The ID of the listing
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success, message, and data
 */
async function getAllApplicationsForListing(listingId, user_id) {
  try {
    const role = await getRoleByUserId(user_id);

    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const allApplicationsForListing = await applications.findAll({ where: { listingId: listingId, userId: user_id } });

      if (manager && allApplicationsForListing) {
        return { success: true, message: "Retrieved successfully", data: allApplicationsForListing };
      } else if (manager && !allApplicationsForListing.length) {
        return { success: true, message: "Retrieved successfully", data: "No applications for listing yet!" };
      } else {
        return { success: false, error: "User doesn't have the permission" };
      }
    } else {
      return { success: false, error: "Only manager can view the applications" };
    }
  } catch (error) {
    console.error("Error in getAllApplicationsForListing:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

/**
 * Get a specific application by ID
 * @param {number} applicationId - The ID of the application
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success, message, and data
 */
async function getApplicationById(applicationId, user_id) {
  try {
    const role = await getRoleByUserId(user_id);

    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const application = await applications.findOne({ where: { id: applicationId, userId: user_id } });

      if (manager && application) {
        return { success: true, message: "Retrieved successfully", data: application };
      } else {
        return { success: false, error: "User doesn't have the permission" };
      }
    }
  } catch (error) {
    console.error("Error in getApplicationById:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

/**
 * Get all applications
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success, message, and data
 */
async function getAllApplications(user_id) {
  try {
    const role = await getRoleByUserId(user_id);

    if (role === "Manager") {
      const manager = await managers.findOne({ where: { userId: user_id } });
      const allApplications = await applications.findAll();

      if (manager && allApplications) {
        return { success: true, message: "Retrieved successfully", data: allApplications };
      } else {
        return { success: false, error: "User doesn't have the permission" };
      }
    }
  } catch (error) {
    console.error("Error in getAllApplications:", error);
    return { success: false, error: "Internal Server Error" };
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

module.exports = {
  createApplication,
  acceptRejectApplication,
  getAllApplicationsForListing,
  getApplicationById,
  getAllApplications,
};
