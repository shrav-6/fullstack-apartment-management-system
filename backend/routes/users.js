const express = require("express");
const router = express.Router();
const { users,tenants,managers,buildings } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { userName,email,name, password,role,phoneNumber,address} = req.body;
  const user1=await users.findOne({ where: { email: email } });
  if(user1==null){
  if(role=="Tenant"){
    const buildingName=req.body.buildingName;
    const building = await buildings.findOne({ where: { buildingName:buildingName } });
    const manager = await managers.findOne({ where: { id:building.managerId } });
    if(manager!=null && building!=null){
      const hash=await bcrypt.hash(password, 10)
      await users.create({
        userName: userName,
        password: hash,
        email:email,
        role:role,
      
      });
    
     const user=await users.findOne({ where: { email: email } });
     const tenant={"name":name,"phoneNumber":phoneNumber,"address":address,managerId:manager.id,"buildingId":building.id,"apartmentNumber":req.body.apartmentNumber,"userId":user.id};
     await tenants.create(tenant);
     res.json({"success": true,
      "message": "user profile created successfully"});
    }
    else{
      res.json({"success": false,
      "error": "Not successfull,invalid buildingname"});
    }
  }
    else if (role=="Manager"){
      const hash = await bcrypt.hash(password, 10);
        await users.create({
          userName: userName,
          password: hash,
          email:email,
          role:role,
        });
      const user=await users.findOne({ where: { email: email } });
      const manager={"name":name,"phoneNumber":phoneNumber,"address":address,"userId":user.id};
        await managers.create(manager);
        res.json({"success": true,
        "message": "user profile created successfully"});
      }
  else{
    res.json({"success": false,
        "error": "Not successful,no specific roles"});
  }
}
else{
  res.json({"success": false,
        "error": "Email is already registered"});
}
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ where: { email: email } });

    if (!user) {
      return res.json({ success: false, error: 'User is not registered' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return  res.json({ error: 'Wrong Username And Password Combination' });
    }

    const accessToken = sign(
      { username: user.username, id: user.id, email: user.email, role: user.role },
      'importantsecret'
    );

    res.json({ token: accessToken, email: user.email, id: user.id, username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.json({ error: 'An error occurred while processing your request.' });
  }
});


module.exports = router;