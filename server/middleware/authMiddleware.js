const asyncholder = require("express-async-handler");
const User = require("../models/user.mongo");
const jwt = require("jsonwebtoken");

const authverified = asyncholder(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("no information about the login user");
    }
    const varified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(varified.id).select("-password");

    if (!user) {
      res.status(400);
      throw new Error("please send some user");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

module.exports = {
  authverified,
};
