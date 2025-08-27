const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");

//User Register
router.post("/register", authController.register);

//User Login
router.post('/login',authController.login)

//User Logout --> Not required, Since token will be handled by frontend
router.get('/logout',authController.logout)

module.exports = router;
