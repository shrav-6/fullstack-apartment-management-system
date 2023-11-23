// data.js

const { listings,tenants,buildings,users, payments } = require("../Models");
//const {  } = require("../models");

async function payRent(date, amount, cardinfo, cvv, user_id) {
    try {
        const role = await getRoleByUserId(user_id);
        if(role=="Tenant"){
            const tenant = await tenants.findOne({ where: { userId: user_id } });            
            const createdPayment = await payments.create({
            date: date,
            amount: amount,
            cardinfo: cardinfo,
            cvv: cvv,
            tenantId:tenant.id,
            });
            const newpaymentId = createdPayment.id;
            //return { success: true, message: "Retrieved successfully", data: allApplications };
            return {"success": true, "message": "created successfully", "data": newpaymentId};
            }
          else{
            return {"success": false,error: "user doesn't have the permissions"};
          }

    } catch (error) {
        console.error("Error in making payment:", error);
    return { success: false, error: "Internal Server Error" };
  
    }
}

async function getPaymentInfo(user_id) {
    try {
        const role = await getRoleByUserId(user_id);
        console.log(role);
        if(role=="Tenant"){
            const tenant = await tenants.findOne({where: {userId: user_id}});
            const allPayments = await payments.findAll({ where: { tenantId: tenant.id } });
            return {"success": true,"message": "Retrieved successfully","data":allPayments};
            
        } else {
            return {"success": false,error: "user is not a tenant"};
        }

    } catch (error) {
        console.error("Error in gettting payment info:", error);
    return { success: false, error: "Internal Server Error" };

    }
}

/**
 * Get user role by user ID
 * @param {number} user_id - The user ID
 * @returns {string} - The user role
 */
async function getRoleByUserId(user_id) {
    const user = await users.findOne({ where: { id: user_id } });
    return user ? user.role : null;
  }

module.exports = {
    payRent,
    getPaymentInfo,
    getRoleByUserId,
  };
