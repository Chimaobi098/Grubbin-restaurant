// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/auth");

import express from "express";
import * as authController from "../controllers/auth.js";

const router = express.Router();

//signup
router.post("/signup", authController.createUser);

//login
router.post("/login", authController.loginUser);

//logout
router.get("/logout", authController.logoutUser);

//access token
router.post("/me", authController.accessToken);

// module.exports = router;
export default router;
