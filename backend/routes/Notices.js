<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const { notices,managers,tenants,buildings,users } = require("../models");
const {validateToken}=require("../Middleware/middleware");

router.get("/:noticeId",validateToken, async (req, res) => {
  const noticeId = req.params.noticeId;
  const role=req.user.role;
  const user_id=req.user.id;
  if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const notice = await notices.findOne({ where: { id:noticeId,managerId:manager.id } });
    if(manager!=null && notice!=null){ 
    res.json({"success": true,
    "message": "Retrieved successfully","data":notice});
  }
  else{
    res.json({"success": false,error: "user don't have the permission"});
  }
}
  else if(role=="Tenant"){
    const tenant = await tenants.findOne({ where: { userId: user_id } });
    const building_id=tenant.buildingId;
    const notice = await notices.findOne({ where: { id:noticeId,buildingId:building_id } });
    if(tenant!=null && notice!=null){ 
      res.json({"success": true,
      "message": "Retrieved successfully","data":notice});
    }
    else{
      res.json({"success": false,error: "user don't have the permission"});
    }
  }
  else{
    res.json({"success": false,error: "user don't have the permission"});
  }

});

router.get("/",validateToken, async (req, res) => {
  const role=req.user.role;
  const user_id=req.user.id;
  if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const notice = await notices.findAll({ where: { managerId:manager.id } });
    if(manager!=null && notice!=null){ 
    res.json({"success": true,
    "message": "Retrieved successfully","data":notice});
  }
  else{
    res.json({"success": false,error: "user don't have the permission"});
  }
}
else if(role=="Tenant"){
  const tenant = await tenants.findOne({ where: { userId: user_id } });
  const building_id=tenant.buildingId;
  const notice = await notices.findAll({ where: { buildingId:building_id } });
  if(tenant!=null && notice!=null){ 
    res.json({"success": true,
    "message": "Retrieved successfully","data":notice});
  }
  else{
    res.json({"success": false,error: "user don't have the permission"});
  }
}
else{
  res.json({"success": false,error: "user don't have the permission"});
}
  
  });

//for posting 
//get user_id from access token then found out the building and manager
//if notice already exist,print the condition already existed
//if role is manager,we will give the access and otherwise not.
router.post("/",validateToken, async (req, res) => {
  const notice = req.body;
  const user_id=req.user.id;
  const role=req.user.role;
  const buildingName=req.body.buildingName;
  if(role=="Manager"){
  const manager = await managers.findOne({ where: { userId: user_id } });
  const building=await buildings.findOne({ where: { managerId:manager.id,buildingName:buildingName} });
  if(manager!=null && building!=null){
    await notices.create({
      title: notice.title,
      description: notice.description,
      dateAndTime: notice.dateAndTime,
      buildingId:building.id,
      managerId:manager.id
    });
    res.json( {"success": true,
    "message": "created successfully"});
  
}
  else{
    res.status(500).json({"success": false,error: "user don't have the permissions"});
  }
}
else{
  res.status(500).json({"success": false,error: "user don't have the permissions"});
}


  
});

router.delete("/:noticeId",validateToken,async (req, res) => {
  const noticeId = req.params.noticeId;
  const user_id=req.user.id;
  const role=req.user.role;
  if(role=="Manager"){
  const manager = await managers.findOne({ where: { userId: user_id } });
  const notice = await notices.findOne({ where: { id:noticeId,managerId:manager.id } });
  if(manager!=null && notice!=null){
    await notices.destroy({
      where: {
        id: noticeId,
      },
    });
    res.json( {"success": true,
    "message": "Deleted successfully"});
  }
  else{
    res.json({"success": false,error: "user don't have the permissions"});
  }
}
else{
  res.json({"success": false,error: "user don't have the permissions"});
}

});


router.put("/:noticeId",validateToken,async (req, res) => {
   const noticeId = req.params.noticeId;
   const title=req.body.title;
   const description=req.body.description;
   const dateAndTime=req.body.dateAndTime;
   const user_id=req.user.id;
   const role=req.user.role;
   if(role=="Manager"){
   const manager = await managers.findOne({ where: { userId: user_id } });
   const notice = await notices.findOne({ where: { id:noticeId,managerId:manager.id } });
  if(manager!=null && notice!=null){
    await notices.update(
      { title: title,description:description,dateAndTime:dateAndTime},
      { where: { id: noticeId } }
    );
    res.json( {"success": true,
    "message": "Updated successfully"});
  }
  else{
    res.status(500).json({"success": false,error: "user don't have the permissions"});
  }
   }
   else{
    res.status(500).json({"success": false,error: "user don't have the permissions"});
  }
   
});


=======
/**
 * Express router to handle notice-related routes.
 * @module routes/Notices
 */

const express = require('express');
const router = express.Router();
const { validateToken } = require('../Middleware/middleware');
const service = require('../Service/Notices');

/**
 * Route to get a particular notice by ID.
 * @name GET/:noticeId
 * @function
 * @memberof module:routes/Notices
 * @inner
 * @param {string} path - Express route path ("/:noticeId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get('/:noticeId', validateToken, async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const role = req.user.role;
    const user_id = req.user.id;

    // Retrieve notice using the data layer function
    const notice = await service.getNoticeById(noticeId, role, user_id);

    // Respond with the result
    if (notice !== null) {
      res.json({ success: true, message: 'Retrieved successfully', data: notice });
    } else {
      res.json({
        success: false,
        error: "User doesn't have the permission to see the notices",
      });
    }
  } catch (error) {
    console.error('Error in get notice by ID:', error);
    res.json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to get all notices for tenants.
 * @name GET/
 * @function
 * @memberof module:routes/Notices
 * @inner
 * @param {string} path - Express route path ("/").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get('/', validateToken, async (req, res) => {
  try {
    const role = req.user.role;
    const user_id = req.user.id;

    // Retrieve all notices using the data layer function
    const notices = await service.getAllNoticesTenant(role, user_id);

    // Respond with the result
    if (notices !== null) {
      res.json({ success: true, message: 'Retrieved successfully', data: notices });
    } else {
      res.json({ success: false, error: "User doesn't have the permission" });
    }
  } catch (error) {
    console.error('Error in get all notices:', error);
    res.json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to get all notices for a manager based on buildingId.
 * @name GET/manager/:buildingId
 * @function
 * @memberof module:routes/Notices
 * @inner
 * @param {string} path - Express route path ("/manager/:buildingId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.get('/manager/:buildingId', validateToken, async (req, res) => {
  try {
    const buildingId = req.params.buildingId;
    const role = req.user.role;
    const user_id = req.user.id;

    // Retrieve all notices using the data layer function
    const notices = await service.getAllNoticesManager(role, user_id, buildingId);

    // Respond with the result
    if (notices !== null) {
      res.json({ success: true, message: 'Retrieved successfully', data: notices });
    } else {
      res.json({ success: false, error: "User doesn't have the permission" });
    }
  } catch (error) {
    console.error('Error in get all notices:', error);
    res.json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to post a new notice.
 * @name POST/
 * @function
 * @memberof module:routes/Notices
 * @inner
 * @param {string} path - Express route path ("/").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.post('/', validateToken, async (req, res) => {
  try {
    const notice = req.body;
    const user_id = req.user.id;
    const role = req.user.role;
    const buildingName = req.body.buildingName;

    // Create a new notice using the data layer function
    const result = await service.createNotice(notice, user_id, role, buildingName);

    // Respond with the result
    if (result) {
      res.json({ success: true, message: 'Created successfully' });
    } else {
      res.json({
        success: false,
        error: "User doesn't have the permission to create a notice",
      });
    }
  } catch (error) {
    console.error('Error in create notice:', error);
    res.json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to delete a notice.
 * @name DELETE/:noticeId
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/:noticeId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.delete('/:noticeId', validateToken, async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const user_id = req.user.id;
    const role = req.user.role;

    // Delete a notice using the data layer function
    const result = await service.deleteNotice(noticeId, user_id, role);

    // Respond with the result
    if (result) {
      res.json({ success: true, message: 'Deleted successfully' });
    } else {
      res.json({ success: false, error: "User doesn't have the permissions" });
    }
  } catch (error) {
    console.error('Error in delete notice:', error);
    resjson({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Route to update a notice.
 * @name PUT/:noticeId
 * @function
 * @memberof module:Routes/Notices
 * @inner
 * @param {string} path - Express route path ("/:noticeId").
 * @param {function} middleware - Middleware function to validate the user's token.
 * @param {function} callback - Express route callback.
 */
router.put('/:noticeId', validateToken, async (req, res) => {
  try {
    const noticeId = req.params.noticeId;
    const title = req.body.title;
    const description = req.body.description;
    const dateAndTime = req.body.dateAndTime;
    const user_id = req.user.id;
    const role = req.user.role;
    const priority=req.body.priority;

    // Update a notice using the data layer function
    const result = await service.updateNotice(
      noticeId,
      title,
      description,
      dateAndTime,
      user_id,
      role,
      priority
    );

    // Respond with the result
    if (result) {
      res.json({ success: true, message: 'Updated successfully' });
    } else {
      res.json({ success: false, error: "User doesn't have the permissions" });
    }
  } catch (error) {
    console.error('Error in update notice:', error);
    res.json({ success: false, error: 'Internal Server Error' });
  }
});

// Export the router
>>>>>>> mer/main
module.exports = router;
