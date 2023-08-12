const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .get("/login", authController.getLogin)
  .get("/signup", authController.getSignUp)
  .post("/login", authController.postLogin)
  .post("/signup", authController.postSignUp)
  .get("/logout", authController.getLogout);

module.exports = router;
