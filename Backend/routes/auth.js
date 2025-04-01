const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

//signup
router.post("/signup", authController.createUser);

//login
router.post("/login", authController.loginUser);

//logout
router.get("/logout", authController.logoutUser);

//access token
router.post("/me", authController.accessToken);

module.exports = router;
