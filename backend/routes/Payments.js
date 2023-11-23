const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/Middleware");
const service = require("../Service/Payments");

router.post("/pay",validateToken, async (req, res) => {
    const date = req.body.date;
    const amount = req.body.amount;
    const cardinfo = req.body.cardinfo;
    const cvv = req.body.cvv;
    const user_id=req.user.id;

    // Call the service layer to accept or reject the application
    const result = await service.payRent(date, amount, cardinfo, cvv, user_id);

    // Respond with the result
    if (result.success) {
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error("Error in payment of rent:", error);
    res.json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/getPaymentInfo", validateToken, async (req, res) => {
  try {
    console.log('in payment router');
    const user_id = req.user.id;

    const result = await service.getPaymentInfo(user_id);

    // Respond with the result
    if (result.success) {
      res.json(result);
    } else {
      res.json(result);
    }

  } catch (error) {
    console.error("Error in getting payment info", error);
    res.json({ success: false, error: "Internal Server Error" });
  }

});

module.exports = router;