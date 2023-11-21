const express = require("express");
const router = express.Router();
const { notices,managers,tenants,buildings,users, listings } = require("../models");
const {validateToken}=require("../Middleware/middleware");

router.get("/:buildingId",validateToken, async (req, res) => {
  const buildingId = req.params.buildingId;
  const role=req.user.role;
  const user_id=req.user.id;
  if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const building = await buildings.findOne({ where: { id:buildingId,managerId:manager.id } });
    if(manager!=null && building!=null){ 
    res.json({"success": true,
    "message": "Retrieved successfully","data":building});
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
    const building  = await buildings.findAll({ where: { managerId:manager.id } });
    if(manager!=null && building!=null){ 
    res.json({"success": true,
    "message": "Retrieved successfully","data":building});
  }
  else{
    res.json({"success": false,error: "user don't have the permission"});
  }
}
else{
  res.json({"success": false,error: "user don't have the permission"});
}
  
  });

  //for tenant view page
  router.get("/new/buildingInfo",validateToken, async (req, res) => {
    console.log('in building info');
    const role=req.user.role;
    const user_id=req.user.id;
    console.log('inside building info API', user_id);
    const tenant = await tenants.findOne({ where: { userId: user_id } });  
    console.log('backend tenant', tenant);  
    if (tenant) {
      const building = await buildings.findOne({ where: { id: tenant.buildingId } });
      console.log('building', building);
    
      const apartmentNumber = tenant.apartmentNumber;
      const buildingName = building.buildingName;
      
      const buildingPhoneNumber = building.phoneNumber;
      const listingId = tenant.listingId;
      console.log('listingId', listingId);
      const listing = await listings.findOne({where: {id: listingId}});
      const manager = await managers.findOne({where: {id: listing.managerId}});
      const managerName = manager.name;
      console.log('listing detail:', listing);
      const address = listing.address;
      const rent = listing.rent;
      const unit = listing.unitAvailable;
      const startsFrom = listing.startsFrom;
      const description = listing.description;
      const extras = listing.extras;
      const pets = listing.pets;
    
      res.json({
        "success": true,
        "message": "Retrieved successfully",
        "data": [apartmentNumber, buildingName, address, buildingPhoneNumber, rent, unit, startsFrom, description, extras, pets, managerName]
      });
    } else {
      res.json({
        "success": false,
        "error": "Tenant not found"
      });
    }
  });

//for posting 
//get user_id from access token then found out the building and manager
//if notice already exist,print the condition already existed
//if role is manager,we will give the access and otherwise not.
router.post("/",validateToken, async (req, res) => {
  const data = req.body;
  const user_id=req.user.id;
  const role=req.user.role;
  const buildingName=req.body.buildingName;
  if(role=="Manager"){
  const manager = await managers.findOne({ where: { userId: user_id } });
  const building=await buildings.findOne({ where: { managerId:manager.id,buildingName:buildingName} });
  if(manager!=null && building==null){
    await buildings.create({
      buildingName: buildingName,
      address: data.address,
      phoneNumber:data.phoneNumber,
      managerId:manager.id
    });
    res.json( {"success": true,
    "message": "created successfully"});
  
}
  else{
    res.status(500).json({"success": false,error: "Already have the same building name"});
  }
}
else{
  res.status(500).json({"success": false,error: "user don't have the permissions"});
}


  
});

router.delete("/:buildingId",validateToken,async (req, res) => {
  const buildingId = req.params.buildingId;
  const user_id=req.user.id;
  const role=req.user.role;
  if(role=="Manager"){
  const manager = await managers.findOne({ where: { userId: user_id } });
  const building = await buildings.findOne({ where: { id:buildingId,managerId:manager.id } });
  if(manager!=null && building!=null){
    await buildings.destroy({
      where: {
        id: buildingId,
      },
    });
    res.json( {"success": true,
    "message": "Deleted successfully"});
  }
  else{
    res.json({"success": false,error: "No such Building Name"});
  }
}
else{
  res.json({"success": false,error: "user don't have the permissions"});
}

});


router.put("/:buildingId",validateToken,async (req, res) => {
   const buildingId = req.params.buildingId;
   const buildingName=req.body.buildingName;
   const address=req.body.address;
   const phoneNumber=req.body.phoneNumber;
   const user_id=req.user.id;
   const role=req.user.role;
   if(role=="Manager"){
   const manager = await managers.findOne({ where: { userId: user_id } });
   const building = await buildings.findOne({ where: { id:buildingId,managerId:manager.id } });
  if(manager!=null && building!=null){
    await buildings.update(
      { buildingName: buildingName,address:address,phoneNumber:phoneNumber},
      { where: { id: buildingId } }
    );
    res.json( {"success": true,
    "message": "Updated successfully"});
  }
  else{
    res.status(500).json({"success": false,error: "No such building name"});
  }
   }
   else{
    res.status(500).json({"success": false,error: "user don't have the permissions"});
  }
   
});


module.exports = router;
