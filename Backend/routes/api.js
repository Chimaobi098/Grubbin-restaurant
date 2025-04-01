const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
const { authenticateToken } = require("../middleware/authenticateToken");

router.get("/menu", apiController.getAllItems);

router.get("/menu/:menuid", apiController.specificItem);

router.get("/test", (req, res) => res.send("working"));

router.get("/orders", authenticateToken, apiController.findOrders);

router.post("/orders", authenticateToken, apiController.createOrder);

router.get("/profile", authenticateToken, apiController.populateProfile);

module.exports = router;
