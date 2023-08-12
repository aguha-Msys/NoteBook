const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongodbConnect = require("./server");
const appRoutes = require("./routes/appRoutes");
const authRoutes = require("./routes/authRoutes");

const PORT = 3000;
const app = express();

// middlewares
app.use("/public", express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Routes
app.use(appRoutes);
app.use(authRoutes);

// server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  mongodbConnect;
});
