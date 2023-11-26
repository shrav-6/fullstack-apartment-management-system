const express = require("express");
const router = express.Router();
const { notices,managers,tenants,buildings,users,newsfeeds } = require("../models");
const {validateToken}=require("../middleware/Middleware");
 

/**
 * Get a particular newsfeed based on newsfeedId.
 *
 * @param {string} req.params.newsfeedId - The ID of the newsfeed to retrieve.
 * @returns {object} - The retrieved newsfeed.
 */

router.get("/get/:newsfeedId",validateToken, async (req, res) => {
  const newsfeedId = req.params.newsfeedId;
  const role=req.user.role;
  const user_id=req.user.id;
  if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const newsfeed = await newsfeeds.findOne({ where: { id:newsfeedId} });
    const tenant=await tenants.findOne({ where: { id:newsfeed.tenantId} });
    if(manager!=null && newsfeed!=null && tenant.managerId==manager.id){
    res.json({"success": true,
    "message": "Retrieved successfully","data":newsfeed});
  }
  else{
    res.json({"success": false,error: "user don't have the permission"});
  }
}
  else if(role=="Tenant"){
    const tenant = await tenants.findOne({ where: { userId: user_id } });
    const building_id=tenant.buildingId;
    const newsfeed = await newsfeeds.findOne({ where: { id:newsfeedId,buildingId:building_id } });
    if(tenant!=null && building_id!=null && newsfeed!=null){
      res.json({"success": true,
      "message": "Retrieved successfully","data":newsfeed});
    }
    else{
      res.json({"success": false,error: "user don't have the permission"});
    }
  }
  else{
    res.json({"success": false,error: "user don't have the permission"});
  }
 
});


/**
 * Get all newsfeeds for a building posted by a particular tenant.
 *
 * @returns {object} - The list of newsfeeds.
 */
router.get("/tenant", validateToken, async (req, res) => {
  try {
    const role = req.user.role;
    const user_id = req.user.id;
      if (role=="Tenant") {
        const tenant = await tenants.findOne({ where: { userId:user_id } });
        const newsfeed = await newsfeeds.findAll({ where: { tenantId:tenant.id } });

        if (newsfeed.length > 0) {
          return res.json({
            success: true,
            message: "Retrieved successfully",
            data: newsfeed,
          });
        } else {
          return res.json({
            success: false,
            error: "No news feeds to be shown",
          });
        }
      } else {
        return res.json({
          success: false,
          error: "Tenant not found",
        });
      }
  } catch (error) {
    console.error("Error:", error);
    return res.json({
      success: false,
      error: "Internal server error",
    });
  }
});

/**
 * Get all newsfeeds for a building (tenant).
 *
 * @returns {object} - The list of newsfeeds.
 */

router.get("/", validateToken, async (req, res) => {
    try {
      const role = req.user.role;
      const user_id = req.user.id;
        if (role=="Tenant") {
          const tenant = await tenants.findOne({ where: { userId: user_id } });
          const building_id = tenant.buildingId;
          const newsfeed = await newsfeeds.findAll({ where: { buildingId: building_id } });
  
          if (newsfeed.length > 0) {
            return res.json({
              success: true,
              message: "Retrieved successfully",
              data: newsfeed,
            });
          } else {
            return res.json({
              success: false,
              error: "No news feeds to be shown",
            });
          }
        } else {
          return res.json({
            success: false,
            error: "Tenant not found",
          });
        }
    } catch (error) {
      console.error("Error:", error);
      return res.json({
        success: false,
        error: "Internal server error",
      });
    }
  });
  

 /**
 * Get newsfeeds under a manager for a particular apartment.
 *
 * @param {string} req.params.buildingId - The ID of the building.
 * @returns {object} - The list of newsfeeds.
 */

  router.get("/manager/:buildingId", validateToken, async (req, res) => {
    try {
      const buildingId = req.params.buildingId;
      const role = req.user.role;
      const user_id = req.user.id;
        if (role=="Manager") {
          const manager = await managers.findOne({ where: { userId: user_id } });
          const building=await buildings.findOne({ where: { id: buildingId } });
          console.log(building);
          if(manager.id==building.managerId && manager!=null && building!=null){
            const newsfeed = await newsfeeds.findAll({ where: { buildingId: building.id } });
            if (newsfeed.length > 0) {
              return res.json({
                success: true,
                message: "Retrieved successfully",
                data: newsfeed,
              });
            } else {
              return res.json({
                success: false,
                error: "No news feeds to be shown",
              });
            }
          }
          else{
            return res.json({
              success: false,
              error: "Cannot Access the Newsfeed,don't have permission",
            });
          }
         
    
        }
          
        else {
          return res.json({
            success: false,
            error: "Cannot Access the Newsfeed,don't have permission",
          });
        }

    } catch (error) {
      console.error("Error:", error);
      return res.json({
        success: false,
        error: "Internal server error",
      });
    }
  });
  
 /**
 * Post a new newsfeed for a tenant.
 *
 * @param {object} req.body - The newsfeed data to be posted.
 * @returns {object} - Success or error message.
 */
router.post("/",validateToken, async (req, res) => {
  const newsfeed = req.body;
  const user_id=req.user.id;
  const role=req.user.role;
  if(role=="Tenant"){
  const tenant = await tenants.findOne({ where: { userId: user_id } });
  if(tenant!=null )
  {
   
      await newsfeeds.create({
      title: newsfeed.title,
      description: newsfeed.description,
      dateAndTime: newsfeed.dateAndTime,
      type:newsfeed.type,
      buildingId:tenant.buildingId,
      tenantId:tenant.id
    });
    res.json( {"success": true,
    "message": "created successfully"});
 
 
 
}
else{
  res.json({"success": false,error: "user don't have the permissions"});
}
  }
else{
  res.json({"success": false,error: "user don't have the permissions"});
}
 
 
 
});
 

/**
 * Delete a newsfeed based on newsfeedId.
 *
 * @param {string} req.params.newsfeedId - The ID of the newsfeed to delete.
 * @returns {object} - Success or error message.
 */
router.delete("/:newsfeedId",validateToken,async (req, res) => {
  const newsfeedId = req.params.newsfeedId;
  const user_id=req.user.id;
  const role=req.user.role;
  if(role=="Tenant"){
  const tenant = await tenants.findOne({ where: { userId: user_id } });
  const newsfeed = await newsfeeds.findOne({ where: { id:newsfeedId,tenantId:tenant.id } });
  if(tenant!=null && newsfeed!=null){
    await newsfeeds.destroy({
      where: {
        id: newsfeedId,
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
 
/**
 * Update a newsfeed based on newsfeedId.
 *
 * @param {string} req.params.newsfeedId - The ID of the newsfeed to update.
 * @param {object} req.body - The updated newsfeed data.
 * @returns {object} - Success or error message.
 */
router.put("/:newsfeedId",validateToken,async (req, res) => {
   const newsfeedId = req.params.newsfeedId;
   const title=req.body.title;
   const description=req.body.description;
   const dateAndTime=req.body.dateAndTime;
   const user_id=req.user.id;
   const role=req.user.role;
   const type=req.body.type;
   if(role=="Tenant"){
   const tenant = await tenants.findOne({ where: { userId: user_id } });
   const newsfeed = await newsfeeds.findOne({ where: { id:newsfeedId,tenantId:tenant.id } });
  if(tenant!=null && newsfeed!=null){
    await newsfeeds.update(
      { title: title,description:description,dateAndTime:dateAndTime,type:type},
      { where: { id: newsfeedId } }
    );
    res.json( {"success": true,
    "message": "Updated successfully"});
  }
  else{
    res.json({"success": false,error: "user don't have the permissions"});
  }
   }
   else{
    res.json({"success": false,error: "user don't have the permissions"});
  }
   
});
 
 
module.exports = router;
 