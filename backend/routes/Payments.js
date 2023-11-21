const express = require("express");
const router = express.Router();
const { listings,tenants,buildings,users, payments } = require("../models");
const {validateToken}=require("../Middleware/middleware");

//router.post("")
router.post("/pay",validateToken, async (req, res) => {
    const date = req.body.date;
    const amount = req.body.amount;
    const cardinfo = req.body.cardinfo;
    const cvv = req.body.cvv;
    const user_id=req.user.id;
    const role=req.user.role;
    //const buildingName=req.body.buildingName;
    if(role=="Tenant"){
    const tenant = await tenants.findOne({ where: { userId: user_id } });
    //const building=await buildings.findOne({ where: { managerId:manager.id,buildingName:buildingName} });
    //if(manager!=null && building!=null){
        const createdPayment = await payments.create({
        date: date,
        amount: amount,
        cardinfo: cardinfo,
        cvv: cvv,
        tenantId:tenant.id,
        //managerId:manager.id
      });
      const newpaymentId = createdPayment.id;
      res.json( {"success": true, "message": "created successfully", "data": newpaymentId});
    }
  else{
    res.json({"success": false,error: "user doesn't have the permissions"});
  }}  
);

router.get("/getInfo", validateToken, async (req, res) => {
    const user_id=req.user.id;
    const role=req.user.role;
    if(role=="Tenant"){
        const tenant = await tenants.findOne({where: {userId: user_id}});
        const allPayments = await payments.findAll({ where: { tenantId: tenant.id } });
        res.json({"success": true,"message": "Retrieved successfully","data":allPayments});
        
    } else {
        res.json({"success": false,error: "user doesn't have the permissions"});
    }

});

/*router.get("/",validateToken, async (req, res) => {
    const role=req.user.role;
    const user_id=req.user.id;
    if(role=="Manager"){
      const manager = await managers.findOne({ where: { userId: user_id } });
      const payment = await payments.findAll({ where: { tenantId: user_id } });
      if(manager!=null && listing!=null){
      res.json({"success": true,
      "message": "Retrieved successfully","data":listing});
        }
        else {
        res.json({"success": false,error: "user doesn't have the permission"});
        }
    }  
 
   });*/

module.exports = router;