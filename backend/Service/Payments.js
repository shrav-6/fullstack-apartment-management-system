// service.js

const data = require("../Data/Payments");

async function payRent(date, amount, cardinfo, cvv, user_id) {
    return await data.payRent(date, amount, cardinfo, cvv, user_id);
}

async function getPaymentInfo(user_id) {
    return await data.getPaymentInfo(user_id);
}

module.exports = {
    payRent,
    getPaymentInfo,
  };