/**
 * Express router to handle application-related routes.
 * @module Routes/Applications
 */

const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/middleware");
const service = require("../Service/Applications");

/**
 * Route to create a new application.
 * @name POST/create
 * @function
 * @memberof module:Routes/Applications
 * @inner
 * @param {string} path - Express route path ("/create").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.post("/create", validateToken, async (req, res) => {
  try {
    // Extract application and user_id from the request body and token
    const application = req.body;
    const user_id=req.user.id;
    const role=req.user.role;
    const listingId =req.body.listingId;
    const status="waitlisted";
    // Call the service layer to create the application
    const result = await service.createApplication(application, status, listingId, user_id);

    // Respond with the result
    if (result.success) {
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error in create application:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to accept or reject an application.
 * @name PUT/accept_reject/:applicationId
 * @function
 * @memberof module:Routes/Applications
 * @inner
 * @param {string} path - Express route path ("/accept_reject/:applicationId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.put("/updateStatus/:applicationId", validateToken, async (req, res) => {
  try {
    // Extract applicationId, status, and user_id from the request body and token
    const applicationId = req.params.applicationId;
    const status = req.body.status;
    const user_id = req.user.id;

    // Call the service layer to accept or reject the application
    const result = await service.updateStatusApplication(applicationId, status, user_id);
    console.log('result in routes', result);
    // Respond with the result
    if (result.success) {
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error in update status application:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to get all applications for a specific listing.
 * @name GET/all/:listingId
 * @function
 * @memberof module:Routes/Applications
 * @inner
 * @param {string} path - Express route path ("/all/:listingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get("/allApplicationsForListing/:listingId", validateToken, async (req, res) => {
  try {
    // Extract listingId and user_id from the request parameters and token
    console.log('inside log of applications route');
    const { listingId } = req.params;
    const user_id = req.user.id;

    // Call the service layer to get all applications for the listing
    const result = await service.getAllApplicationsForListing(listingId, user_id);

    // Respond with the result
    if (result.success) {
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error in get all applications for listing:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to get a specific application by ID.
 * @name GET/get/:applicationId
 * @function
 * @memberof module:Routes/Applications
 * @inner
 * @param {string} path - Express route path ("/get/:applicationId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get("/get/:applicationId", validateToken, async (req, res) => {
  try {
    // Extract applicationId and user_id from the request parameters and token
    const { applicationId } = req.params;
    const user_id = req.user.id;

    // Call the service layer to get the application by ID
    const result = await service.getApplicationById(applicationId, user_id);

    // Respond with the result
    if (result.success) {
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error in get application by ID:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to get all applications.
 * @name GET/getAll
 * @function
 * @memberof module:Routes/Applications
 * @inner
 * @param {string} path - Express route path ("/getAll").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get("/getAll", validateToken, async (req, res) => {
  try {
    // Extract user_id from the token
    const user_id = req.user.id;

    // Call the service layer to get all applications
    const result = await service.getAllApplications(user_id);

    // Respond with the result
    if (result.success) {
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error in get all applications:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
