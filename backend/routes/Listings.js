const express = require("express");
const router = express.Router();
const { listings,managers,buildings,users } = require("../models");
const {validateToken}=require("../Middleware/middleware");

//to insert a new listing for a manager
router.post("/",validateToken, async (req, res) => {
    const listing = req.body;
    const user_id=req.user.id;
    const role=req.user.role;
    const buildingName=req.body.buildingName;
    if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const building=await buildings.findOne({ where: { managerId:manager.id,buildingName:buildingName} });
    if(manager!=null && building!=null){
      await listings.create({
        noOfBedrooms: listing.noOfBedrooms,
        description: listing.description,
        moveInDate: listing.moveInDate,
        moveOutDate: listing.moveOutDate,
        rentPerMonth: listing.rentPerMonth,
        address: listing.address,
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

   //to get all listings for public view
  router.get("/all",validateToken, async (req, res) => {
    const role=req.user.role;
    const user_id=req.user.id;
    if(role=="Manager"){
      const manager = await managers.findOne({ where: { userId: user_id } });
      const listing = await listings.findAll();
      if(manager!=null && listing!=null){ 
      res.json({"success": true,
      "message": "Retrieved successfully","data":listing});
        }
        else {
        res.json({"success": false,error: "user doesn't have the permission"});
        }
    }   
 
   });

//to get a particular listing based on listingId
router.get("/:ListingId",validateToken, async (req, res) => {
const listingId = req.params.ListingId;
const role=req.user.role;
const user_id=req.user.id;
if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const listing = await listings.findOne({ where: { id:listingId,managerId:manager.id } });
    if(manager!=null && listing!=null){ 
        res.json({"success": true,
        "message": "Retrieved successfully","data":listing});
    }
    else{
        res.json({"success": false,error: "user doesn't have the permission"});
    }
} });

//to update a particular listing based on listingId
router.put("/:ListingId",validateToken,async (req, res) => {
    const listingId = req.params.ListingId;
    const noOfBedrooms=req.body.noOfBedrooms;
    const description=req.body.description;
    const moveInDate=req.body.moveInDate;
    const moveOutDate=req.body.moveOutDate;
    const rentPerMonth=req.body.rentPerMonth;
    const address=req.body.address;
    const user_id=req.user.id;
    const role=req.user.role;
    if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const listing = await listings.findOne({ where: { id:listingId,managerId:manager.id } });
   if(manager!=null && listing!=null){
     await listings.update(
       { noOfBedrooms: noOfBedrooms,description:description,moveInDate:moveInDate, moveOutDate:moveOutDate, rentPerMonth:rentPerMonth, address:address},
       { where: { id: listingId } }
     );
     res.json( {"success": true,
     "message": "Updated successfully"});
   }
   else{
     res.status(500).json({"success": false,error: "user doesn't have the permissions"});
   }
    }
    else{
     res.status(500).json({"success": false,error: "user doesn't have the permissions"});
   }
    
 });

//to delete a listing based on listingId
router.delete("/:ListingId",validateToken,async (req, res) => {
    const listingId = req.params.ListingId;
    const user_id=req.user.id;
    const role=req.user.role;
    if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const listing = await listings.findOne({ where: { id:listingId,managerId:manager.id } });
    if(manager!=null && listing!=null){
      await listings.destroy({
        where: {
          id: listingId,
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

module.exports = router;