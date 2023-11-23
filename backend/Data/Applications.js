// data.js

const { applications, managers, listings,users, tenants } = require("../Models");

/**
 * Create a new application from a guest user
 * @param {Object} application - The application details
 * @param {number} user_id - The user ID
 * @returns {Object} - Object containing success and message
 */
async function createApplication(application, status, listingId, user_id) {
  try {
    const status = "waitlisted";
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
async function updateStatusApplication(applicationId, status, user_id) {
  try {
    if (status == 'approved' || status == 'rejected' || status == 'waitlisted') {
      //const user_id=req.user.id;
      const role = await getRoleByUserId(user_id);
      if (role && role === "Manager") {
        const manager = await managers.findOne({ where: { userId: user_id } });
        const application = await applications.findOne({ where: { id: applicationId } });
        if (manager && application) {
          await applications.update(
            { status: status },
            { where: { id: applicationId } }
          );

          if (status === 'approved') {
            const guestUser = await users.findOne({ where: { id: application.userId } });

            if (guestUser) {
              await users.update(
                { role: 'Tenant' },
                { where: { id: application.userId } }
              );

              const listing = await listings.findOne({ where: { id: application.listingId } });
              const tenant = {
                "name": application.firstName + " " + application.lastName,
                "phoneNumber": application.phoneNumber,
                "apartmentNumber": listing.apartmentNumber,
                "userId": application.userId,
                "managerId": manager.id,
                "buildingId": listing.buildingId,
                "listingId": listing.listingId
              };
              await tenants.create(tenant);
              await guests.destroy(
                { where: { userId: application.userId } }
              );

              return { success: true, message: "Updated successfully" };
            }
          }
        } else {
          console.log('Manager or Application not found');
        }
      } else {
        console.log('Not a Manager role');
        return { success: false, error: "User is not a manager! Only managers can accept/reject applications!" };
      }
    } else {
      console.error("User can only approve, reject, or waitlist");
      return { success: false, error: "User can only approve, reject, or waitlist" };
    }
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
      const allApplicationsForListing = await applications.findAll({ where: { listingId: listingId } });

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
  updateStatusApplication,
  getAllApplicationsForListing,
  getApplicationById,
  getAllApplications,
};
