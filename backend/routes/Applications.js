const express = require('express');
const router = express.Router();
const { applications,guests,listings,users, managers } = require("../models");
const {validateToken}=require("../Middleware/middleware");

// create new application from user type: guest
router.post('/create',validateToken, async (req, res) => {
    console.log("inside create application");
    const application = req.body;
    const user_id=req.user.id;
    const role=req.user.role;
    const listingId =req.body.listingId;
    const status="In progress";
    const listing=await listings.findOne({ where: { id:application.listingId} });
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
      "message": "application created successfully,In pending with approval"});
    
  }
    else{
      res.json({"success": false,error: "You can't apply for this Apartment"});
    }

});

// manager can accept/reject applications
router.put('/accept_reject/:applicationId',validateToken, async (req, res) => {
  const applicationId = req.params.applicationId;
  // const message = req.params.message;
  // const gender = req.params.gender;
  const status = req.body.status;
  // const listingId = req.params.listingId;
  console.log(status);
  if (status == 'accept' || status == 'reject') {
    const user_id=req.user.id;
    const role=req.user.role;
    console.log(user_id);
    if(role=="Manager"){
      const manager = await managers.findOne({ where: { userId: user_id } });
      const application = await applications.findOne({ where: { id:applicationId ,userId: user_id }  });
      if(manager!=null && application!=null){
        await applications.update(
          { status:status},
          { where: { id: applicationId } }
        );
        res.json( {"success": true,
        "message": "Updated successfully"});
        if(status == 'accept') {
          // notify guest that application is accepted

          // change role from guest to tenant
        } else {
          // notify tenant that application is rejected
        }
      } else {
        res.json({"success": false,error: "User is not a manager! Only managers can accept/reject applications!"});
      }
    }
    else {
      res.json({"success": false,error: "User is not a manager! Only managers can accept/reject applications!"});
    }
  } else {
    res.json({"success": false,error: "Can perform two operation either accept or reject"});
  }
});

//to get all applications based on listingId
router.get("/all/:listingId",validateToken, async (req, res) => {
    const listingId = req.params.listingId
    const role=req.user.role;
    const user_id=req.user.id;
    if(role=="Manager"){
        const manager = await managers.findOne({ where: { userId: user_id } });
        const allapplicationforlisting = await applications.findAll({ where: {listingId: listingId,userId: user_id}});
        if(manager!=null && allapplicationforlisting!=null){ 
            res.json({"success": true, "message": "Retrieved successfully","data":allapplicationforlisting});
        }
        else if(manager!=null && allapplicationforlisting==null) {
            res.json({"success": true, "message": "Retrieved successfully","data":"No applications for listing yet!"});
        }
        else {
            res.json({"success": false,error: "user doesn't have the permission"});
        }
    } else {
        res.json({"success": false, error: "Only manager can view the applications"});
    } 
});

// view a particular application based on application_id
router.get("/get/:applicationId",validateToken, async (req, res) => {
    const applicationId = req.params.applicationId;
    const role=req.user.role;
    const user_id=req.user.id;
    if(role=="Manager"){
        const manager = await managers.findOne({ where: { userId: user_id } });
        const application = await applications.findOne({ where: { id: applicationId,userId: user_id } });
        if(manager!=null && application!=null){ 
            res.json({"success": true, "message": "Retrieved successfully","data":application});
        }
        else{
            res.json({"success": false,error: "user doesn't have the permission"});
        }
    }
});

//to get all applications
// view a particular application based on application_id
router.get("/getAll",validateToken, async (req, res) => {
    const role=req.user.role;
    const user_id=req.user.id;
    if(role=="Manager"){
        const manager = await managers.findOne({ where: { userId: user_id } });
        const application = await applications.findAll();
        if(manager!=null && application!=null){ 
            res.json({"success": true, "message": "Retrieved successfully","data":application});
        }
        else{
            res.json({"success": false,error: "user doesn't have the permission"});
        }
    }
});

module.exports = router;