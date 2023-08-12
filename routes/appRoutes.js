const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");
const auth = require("../middlewares/auth");

router
  .get("/", auth, appController.getNotes)
  .get("/add", auth, appController.getAddNotes)
  .get("/search?", auth, appController.getSearch)
  .post("/add", auth, appController.postAddNotes)
  .get("/edit/:noteId", auth, appController.getEditNotes)
  .post("/edit/:noteId?", auth, appController.postEditNotes)
  .get("/delete/:noteId?", auth, appController.deleteNotes)
  .get("/starred", auth, appController.getStarred)
  .post("/starred/:noteId?", auth, appController.postStarSetTrue)
  .post("/unStar/:noteId?", auth, appController.postStarSetFalse);

module.exports = router;
