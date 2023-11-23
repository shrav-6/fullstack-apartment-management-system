/**
 * Express router to handle listing-related routes.
 * @module Routes/Listings
 */

const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/Middleware");
const service = require("../Service/Listings");

/**
 * Route to insert a new listing for a manager.
 * @name POST/
 * @function
 * @memberof module:Routes/Listings
 * @inner
 * @param {string} path - Express route path ("/").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.post("/", validateToken, async (req, res) => {
  try {
    // Extract listing, user_id, role, and buildingName from the request body
    const listing = req.body;
    const user_id = req.user.id;
    const role = req.user.role;
    const buildingName = req.body.buildingName;

    // Call the service layer to create a new listing
    const result = await service.createListing(listing, user_id, role, buildingName);

    // Check if the listing is created successfully or if there's an error
    if (result) {
      res.json({ success: true, message: "Created successfully" });
    } else {
      res.status(500).json({ success: false, error: "User doesn't have the permission or an error occurred" });
    }
  } catch (error) {
    console.error("Error in / route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
  //else{
    //res.json({"success": false,error: "user don't have the permissions"});
 // }
   
  });
 
 
  //to get all listings from one manager for landlord view
  router.get("/",validateToken, async (req, res) => {
    const role=req.user.role;
    const user_id=req.user.id;
    if(role=="Manager"){
      const manager = await managers.findOne({ where: { userId: user_id } });
      const listing = await listings.findAll({ where: { managerId:manager.id } });
      if(manager!=null && listing!=null){
      res.json({"success": true,
      "message": "Retrieved successfully","data":listing});
        }
        else {
        res.json({"success": false,error: "user doesn't have the permission"});
        }
    }  
 
   });

   //to get all listings from one building
  router.get("/forOneBuilding/:buildingName",validateToken, async (req, res) => {
    const role=req.user.role;
    const user_id=req.user.id;
    const buildingName=req.params.buildingName
    if(role=="Manager"){
      const manager = await managers.findOne({ where: { userId: user_id } });
      const building = await buildings.findOne({where: { buildingName: buildingName}});
      const listing = await listings.findAll({ where: { managerId:manager.id, buildingId: building.id } });
      if(manager!=null && listing!=null && building!=null){
      res.json({"success": true,
      "message": "Retrieved successfully","data":listing});
        }
        else {
        res.json({"success": false,error: "user doesn't have the permission"});
        }
    }  
 
   });
 
   //to get all listings for public view
   /*router.get("/all", async (req, res) => {
    try {
      const listing = await listings.findAll({
        include: buildings, // Include the Building model in the query
      });
 
      if (listing.length > 0) {
        const responseData = listing.map((listing) => ({
          id: listing.id,
          unitAvailable: listing.unitAvailable,
          apartmentNumber: listing.apartmentNumber,
          rent: listing.rent,
          address: listing.address,
          pets: listing.pets,
          startsFrom: listing.startsFrom,
          description: listing.description,
          extras: listing.extras,
          buildingName: listing.building ? listing.building.buildingName : null, // Access the buildingName from the Building model
        }));
 
        res.json({
          success: true,
          message: "Retrieved successfully",
          data: responseData,
        });
      } else {
        res.json({
          success: false,
          error: "No listings found or user doesn't have permission",
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        error: "An error occurred while retrieving data",
      });
    }
  });*/
 
 
//to get a particular listing based on listingId
/*router.get("/:ListingId",validateToken, async (req, res) => {
const listingId = req.params.ListingId;
const role=req.user.role;
const user_id=req.user.id;
if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const listing = await listings.findOne({ where: { id:listingId,managerId:manager.id } });
    if(manager!=null && listing!=null){
        res.json({"success": true,
        "message": "Retrieved successfully","data":listing});
});*/

/**
 * Route to get all listings from one building.
 * @name GET/Building/:buildingId
 * @function
 * @memberof module:Routes/Listings
 * @inner
 * @param {string} path - Express route path ("/Building/:buildingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get("/Building/:buildingId", validateToken, async (req, res) => {
  try {
    // Extract user_id, buildingId, and role from the token and request parameters
    const user_id = req.user.id;
    const buildingId = req.params.buildingId;
    const role = req.user.role;

    // Call the service layer to get all listings for a building
    const listings = await service.getAllListingsForBuilding(user_id, buildingId, role);

    // Check if listings are found
    if (listings) {
      res.json({ success: true, message: "Retrieved successfully", data: listings });
    } else {
      res.json({ success: false, error: "User doesn't have the permission or an error occurred" });
    }
  } catch (error) {
    console.error("Error in /Building/:buildingId route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/**
 * Route to get all listings for public view.
 * @name GET/all
 * @function
 * @memberof module:Routes/Listings
 * @inner
 * @param {string} path - Express route path ("/all").
 * @param {function} callback - Express route callback.
 */
router.get("/all", async (req, res) => {
  try {
    // Call the service layer to get all listings for public view
    const listings = await service.getAllListingsForPublicView();

    // Check if listings are found
    if (listings) {
      res.json({ success: true, message: "Retrieved successfully", data: listings });
    } else {
      res.json({ success: false, error: "An error occurred while retrieving data" });
    }
  } catch (error) {
    console.error("Error in /all route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/**
 * Route to get a particular listing based on listingId.
 * @name GET/:ListingId
 * @function
 * @memberof module:Routes/Listings
 * @inner
 * @param {string} path - Express route path ("/:ListingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get("/:ListingId", validateToken, async (req, res) => {
  try {
    // Extract listingId, user_id, and role from the request parameters and token
    const listingId = req.params.ListingId;
    const user_id = req.user.id;
    const role = req.user.role;

    // Call the service layer to get a listing by ID
    const listing = await service.getListingById(listingId, user_id, role);

    // Check if the listing is found
    if (listing) {
      res.json({ success: true, message: "Retrieved successfully", data: listing });
    } else {
      res.json({ success: false, error: "User doesn't have the permission or an error occurred" });
    }
  } catch (error) {
    console.error("Error in /:ListingId route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/**
 * Route to update a particular listing based on listingId.
 * @name PUT/:ListingId
 * @function
 * @memberof module:Routes/Listings
 * @inner
 * @param {string} path - Express route path ("/:ListingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.put("/:ListingId", validateToken, async (req, res) => {
  try {
    // Extract listingId, data, user_id, and role from the request parameters, body, and token
    const listingId = req.params.ListingId;
    const data = req.body;
    const user_id = req.user.id;
    const role = req.user.role;

    // Call the service layer to update a listing
    const result = await service.updateListing(listingId, data, user_id, role);

    // Check if the listing is updated successfully or if there's an error
    if (result) {
      res.json({ success: true, message: "Updated successfully" });
    } else {
      res.status(500).json({ success: false, error: "User doesn't have the permission or an error occurred" });
    }
  } catch (error) {
    console.error("Error in /:ListingId route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/**
 * Route to delete a listing based on listingId.
 * @name DELETE/:ListingId
 * @function
 * @memberof module:Routes/Listings
 * @inner
 * @param {string} path - Express route path ("/:ListingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.delete("/:ListingId", validateToken, async (req, res) => {
  try {
    // Extract listingId, user_id, and role from the request parameters and token
    const listingId = req.params.ListingId;
    const user_id = req.user.id;
    const role = req.user.role;

    // Call the service layer to delete a listing
    const result = await service.deleteListing(listingId, user_id, role);

    // Check if the listing is deleted successfully or if there's an error
    if (result) {
      res.json({ success: true, message: "Deleted successfully" });
    } else {
      res.json({ success: false, error: "User doesn't have the permission or an error occurred" });
    }
  } catch (error) {
    console.error("Error in /:ListingId route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
