/**
 * Express router to handle building-related routes.
 * @module Routes/Buildings
 */

const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/middleware");
const service = require("../Service/Buildings");

/**
 * Route to get a particular building by ID.
 * @name GET/:buildingId
 * @function
 * @memberof module:Routes/Buildings
 * @inner
 * @param {string} path - Express route path ("/:buildingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get("/:buildingId", validateToken, async (req, res) => {
  try {
    // Extract buildingId, role, and user_id from the request parameters and token
    const buildingId = req.params.buildingId;
    const role = req.user.role;
    const user_id = req.user.id;

    // Call the service layer to get a building by ID
    const building = await service.getBuildingById(buildingId, role, user_id);

    // Check if building is found
    if (building) {
      res.json({ success: true, message: "Retrieved successfully", data: building });
    } else {
      res.json({ success: false, error: "User doesn't have the permission to see the buildings" });
    }
  } catch (error) {
    console.error("Error in get building by ID:", error);
    res.status.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to get all buildings.
 * @name GET/
 * @function
 * @memberof module:Routes/Buildings
 * @inner
 * @param {string} path - Express route path ("/").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get("/", validateToken, async (req, res) => {
  try {
    console.log("hi");
    // Extract role and user_id from the token
    const role = req.user.role;
    const user_id = req.user.id;

    // Call the service layer to get all buildings based on user role
    const buildings = await service.getAllBuildings(role, user_id);

    // Check if buildings are found
    if (buildings) {
      res.json({ success: true, message: "Retrieved successfully", data: buildings });
    } else {
      res.json({ success: false, error: "User doesn't have the permission" });
    }
  } catch (error) {
    console.error("Error in get all buildings:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to create a new building.
 * @name POST/
 * @function
 * @memberof module:Routes/Buildings
 * @inner
 * @param {string} path - Express route path ("/").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.post("/", validateToken, async (req, res) => {
  try {
    // Extract data, user_id, role, and buildingName from the request body
    const data = req.body;
    const user_id = req.user.id;
    const role = req.user.role;
    const buildingName = req.body.buildingName;

    // Call the service layer to create a new building
    const result = await service.createBuilding(data, user_id, role, buildingName);

    // Check if the building is created successfully or if there's an error
    if (result) {
      res.json({ success: true, message: "Created successfully" });
    } else {
      res.status.json({ success: false, error: "Building name already exists or user doesn't have the permission" });
    }
  } catch (error) {
    console.error("Error in create building:", error);
    res.status.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to delete a building.
 * @name DELETE/:buildingId
 * @function
 * @memberof module:Routes/Buildings
 * @inner
 * @param {string} path - Express route path ("/:buildingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.delete("/:buildingId", validateToken, async (req, res) => {
  try {
    // Extract buildingId, user_id, and role from the request parameters and token
    const buildingId = req.params.buildingId;
    const user_id = req.user.id;
    const role = req.user.role;

    // Call the service layer to delete a building
    const result = await service.deleteBuilding(buildingId, user_id, role);

    // Check if the building is deleted successfully or if there's an error
    if (result) {
      res.json({ success: true, message: "Deleted successfully" });
    } else {
      res.json({ success: false, error: "User doesn't have the permissions or building doesn't exist" });
    }
  } catch (error) {
    console.error("Error in delete building:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to update a building.
 * @name PUT/:buildingId
 * @function
 * @memberof module:Routes/Buildings
 * @inner
 * @param {string} path - Express route path ("/:buildingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.put("/:buildingId", validateToken, async (req, res) => {
  try {
    // Extract buildingId, buildingName, address, phoneNumber, user_id, and role from the request body
    const buildingId = req.params.buildingId;
    const buildingName = req.body.buildingName;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const user_id = req.user.id;
    const role = req.user.role;

    // Call the service layer to update a building
    const result = await service.updateBuilding(buildingId, buildingName, address, phoneNumber, user_id, role);

    // Check if the building is updated successfully or if there's an error
    if (result) {
      res.json({ success: true, message: "Updated successfully" });
    } else {
      res.status.json({ success: false, error: "User doesn't have the permissions or building doesn't exist" });
    }
  } catch (error) {
    console.error("Error in update building:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

/**
 * Route to find building names for sign up.
 * @name GET/signup/byName
 * @function
 * @memberof module:Routes/Buildings
 * @inner
 * @param {string} path - Express route path ("/signup/byName").
 * @param {function} callback - Express route callback.
 */
router.get("/signup/byName", async (req, res) => {
  try {
    // Call the service layer to get all buildings for sign up
    const result = await service.getAllBuildingsForSignUp();

    // Check if buildings are found
    if (result) {
      res.json({ success: true, message: "Retrieved successfully", result: result });
    } else {
      res.status.json({ success: false, error: "No buildings exist" });
    }
  } catch (error) {
    console.error("Error in getting building:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
