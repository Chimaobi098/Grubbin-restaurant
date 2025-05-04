import express from "express";
const router = express.Router();

import * as apiController from "../controllers/api.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { chatLimiter } from "../middleware/rateLimiter.js";
import { chatSlowDown } from "../middleware/slowDown.js";

router.get("/menu", apiController.getAllItems);

router.get("/menu/:menuid", apiController.specificItem);

router.get("/test", (req, res) => res.send("working"));

router.get("/orders", authenticateToken, apiController.findOrders);

router.post("/orders", authenticateToken, apiController.createOrder);

router.get("/profile", authenticateToken, apiController.populateProfile);

router.post("/chat", chatLimiter, apiController.chat);

export default router;
