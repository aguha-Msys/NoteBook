const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://aguha:X3A5QyAHusxeaCLj@work-cluster.tmieuxj.mongodb.net/testApis";
exports.connect = mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongodb connected !");
  })
  .catch((error) => {
    console.log(error);
  });
