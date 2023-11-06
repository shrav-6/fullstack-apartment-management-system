const express = require("express");
const router = express.Router();
const { notices,managers,tenants,buildings,users } = require("../models");
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
