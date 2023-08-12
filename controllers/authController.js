const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    user: null,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      "MsysTechnologies",
      {
        expiresIn: 300, // 1 minute, for testing purposes
      }
    );

    res.cookie("token", token); // Set the token in the cookie

    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getSignUp = (req, res, next) => {
  res.render("auth/register", {
    pageTitle: "Sign Up",
    user: null,
  });
};

exports.postSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  //   const hash = await bcrypt.hash(password, 10, (hash, error) => {
  //     console.log(error);
  //     console.log(hash);
  //   });
  try {
    const user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign(
      { id: user._id, email, password },
      "MsysTechnologies",
      {
        expiresIn: 60,
      }
    );
    await user.save();
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
  }
};

exports.getLogout = (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/login");
};
