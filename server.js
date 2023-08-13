const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://arjunporey07:ARJUN%40CR%4007@notebookdb.lu2huni.mongodb.net/notebookdb";
exports.connect = mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongodb connected !");
  })
  .catch((error) => {
    console.log(error);
  });
