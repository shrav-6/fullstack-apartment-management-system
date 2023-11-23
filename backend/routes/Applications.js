/**
 * Express router to handle application-related routes.
 * @module Routes/Applications
 */

const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/Middleware");
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
    /*const listing=await listings.findOne({ where: { id:application.listingId} });
    if(listing!=null){
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
        listingId:listing.id,
        userId:user_id
      });
      res.json( {"success": true,
      "message": "application created successfully, In pending with approval"});
    
  }
    else{
      res.json({"success": false,error: "You can't apply for this Apartment"});
    }*/
});

// manager can accept/rejected applications
/*router.put('/updateStatus/:applicationId',validateToken, async (req, res) => {
  const applicationId = req.params.applicationId;
  // const message = req.params.message;
  // const gender = req.params.gender;
  const status = req.body.status;
  // const listingId = req.params.listingId;
  console.log('status in backend', status);
  if (status == 'approved' || status == 'rejected' || status == 'waitlisted') {
    const user_id=req.user.id;
    const role=req.user.role;
    console.log(user_id, role);
    if(role=="Manager"){
      const manager = await managers.findOne({ where: { userId: user_id } });
      const application = await applications.findOne({ where: { id:applicationId}  });
      console.log('inside manager role', manager);
      if(manager!=null && application!=null){
        await applications.update(
          { status:status},
          { where: { id: applicationId } }
        );
        res.json( {"success": true,
        "message": "Updated successfully"});
        if(status == 'approved') {
          // notify guest that application is accepted
          // write logic here
          
          // change role from guest to tenant below:
          // update role in users table
          const user = await users.findOne({where: {id: user_id }});
          console.log('guest user id', application.userId);
          if(user!=null) {
            await users.update(
              { role: 'Tenant' },
              { where : {id: application.userId}}
            );
          } else {
            console.log('User does not exist in users table');
          }
          // create entry in tenant table
          const listing = await listings.findOne({where: {id: application.listingId}})
          console.log('inside approval, buildingId', listing.buildingId);
          // const building = await Buildings.findOne({})
          //const listing =
          const tenant={"name":application.firstName+" "+application.lastName,"phoneNumber":application.phoneNumber,"apartmentNumber":listing.apartmentNumber,"userId":application.userId,managerId:manager.id, buildingId: listing.builingId, listingId: listing.listingId};
          await tenants.create(tenant);
          console.log("entered in tenant table");
          // delete from guests table
          await guests.destroy(
            { where: { userId: application.userId } }
          );
          console.log("deleted from guests table");
        } else if(status == 'rejected') {
          // notify tenant that application is rejected
        }
      } else {
        console.log('something is null');
      }
    }
    else {
      res.json({"success": false,error: "User is not a manager! Only managers can approved/rejected applications!"});
    }
  } else {
    res.json({"success": false,error: "Can perform two operation either approved or rejected"});
  }
});*/

//to get all applications based on listingId
/*router.get("/all/:listingId",validateToken, async (req, res) => {
    const listingId = req.params.listingId
    const role=req.user.role;
    const user_id=req.user.id;
    if(role=="Manager"){
        const manager = await managers.findOne({ where: { userId: user_id } });
        const allapplicationforlisting = await applications.findAll({ where: {listingId: listingId}});
        if(manager!=null && allapplicationforlisting.length!=0){ 
            res.json({"success": true, "message": "Retrieved successfully","data":allapplicationforlisting});
        }
        else if(manager!=null && allapplicationforlisting.length==0) {
            res.json({"success": true, "message": "No applications for listing yet!"});
        }
        else {
            res.json({"success": false,error: "user doesn't have the permission"});
        }
    const user_id = req.user.id;

    // Call the service layer to create the application
    const result = await service.createApplication(application, user_id);

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
});*/

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
