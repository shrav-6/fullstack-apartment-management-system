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
        const createdListing = await listings.create({
        unitAvailable: listing.unitAvailable,
        apartmentNumber: listing.apartmentNumber,
        rent: listing.rent,
        address: listing.address,
        pets: listing.pets,
        startsFrom: listing.startsFrom,
        description: listing.description,
        extras:listing.extras,
        buildingId:building.id,
        managerId:manager.id
      });
      const listingId = createdListing.id;
      res.json( {"success": true, "message": "created successfully", "data": listingId,});
   
  }
    else{
      res.json({"success": false,error: "user don't have the permissions"});
    }
  }
  else{
    res.json({"success": false,error: "user don't have the permissions"});
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
   router.get("/all", async (req, res) => {
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
    const unitAvailable=req.body.unitAvailable;
    const apartmentNumber=req.body.apartmentNumber;
    const description=req.body.description;
    const startsFrom=req.body.startsFrom;
    const pets=req.body.pets;
    const rent=req.body.rent;
    const address=req.body.address;
    const extras=req.body.description;
    const user_id=req.user.id;
    const role=req.user.role;
    if(role=="Manager"){
    const manager = await managers.findOne({ where: { userId: user_id } });
    const listing = await listings.findOne({ where: { id:listingId,managerId:manager.id } });
   if(manager!=null && listing!=null){
     await listings.update(
       { unitAvailable: unitAvailable, apartmentNumber: apartmentNumber, description:description,startsFrom:startsFrom, pets:pets, rent:rent, address:address,extras:extras},
       { where: { id: listingId } }
     );
     res.json( {"success": true,
     "message": "Updated successfully"});
   }
   else{
     res.json({"success": false,error: "user doesn't have the permissions"});
   }
    }
    else{
     res.json({"success": false,error: "user doesn't have the permissions"});
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