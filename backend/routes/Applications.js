const express = require('express');
const router = express.Router();
const { applications,guests,listings,users, tenants, managers } = require("../models");
const {validateToken}=require("../Middleware/middleware");

// create new application from user type: guest
router.post('/create',validateToken, async (req, res) => {
    console.log("inside create application");
    const application = req.body;
    const user_id=req.user.id;
    const role=req.user.role;
    const listingId =req.body.listingId;
    const status="waitlisted";
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

// manager can accept/rejected applications
router.put('/updateStatus/:applicationId',validateToken, async (req, res) => {
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
          const building = await listings.findOne({where: {id: application.listingId}})
          const tenant={"name":application.firstName+" "+application.lastName,"phoneNumber":application.phoneNumber,"apartmentNumber":application.listingId,"userId":application.userId,managerId:manager.id, buildingId: building.id};
          await tenants.create(tenant);
          console.log("entry in tenant table");
          // delete from guests table
          await guests.destroy(
            { where: { userId: application.userId } }
          );
          console.log("after deleting from guests table");
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
});

//to get all applications based on listingId
router.get("/all/:listingId",validateToken, async (req, res) => {
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