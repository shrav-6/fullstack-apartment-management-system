 
const express = require("express");
const router = express.Router();
const { notices,managers,tenants,buildings,users,newsfeeds } = require("../Models");
const {validateToken}=require("../Middleware/middleware");
 
 
//for getting a particular newsfeed
router.get("/get/:newsfeedId",validateToken, async (req, res) => {
  
});
 
 
 
//to get all newsfeed for a building ((posted by a particular tenant))
router.get("/tenant", validateToken, async (req, res) => {
  
});
 
 
 
 
 
 
//to get all newsfeed for a building ((tenant))
router.get("/", validateToken, async (req, res) => {

  });
 
 
  //for getting newfeed under that manager for a particular apt
 
  router.get("/manager/:buildingId", validateToken, async (req, res) => {
  
  });
 
 //for posting a newsfeed for tenant
router.post("/",validateToken, async (req, res) => {
 
});
 
 
//for deleting a newsfeed
router.delete("/:newsfeedId",validateToken,async (req, res) => {
  
});
 
 
module.exports = router;