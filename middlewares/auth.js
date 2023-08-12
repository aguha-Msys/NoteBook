const jwt = require("jsonwebtoken");
const User = require("../models/User");
function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).redirect("/login");
  }
  jwt.verify(token, "MsysTechnologies", (error, user) => {
    if (error) {
      return res.status(401).redirect("/login");
    } else {
      //console.log(req.user);
      req.user = user;
      next();
    }
  });
}
module.exports = auth;
