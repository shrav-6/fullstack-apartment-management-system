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


module.exports = router;
