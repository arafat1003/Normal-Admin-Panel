const asyncholder = require("express-async-handler");
const User = require("../models/user.mongo");
const jet = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Token = require("../models/token.mongo");
const sendEmail = require("../emailSender/nodemailer");
function getToken(id) {
  return jet.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const userControl = asyncholder(async (req, res, next) => {
  const { name, email, password, phonenumber } = req.body;

  if (!name) {
    res.status(401);
    throw new Error("no name is included");
  }
  if (!email) {
    res.status(401);
    throw new Error("no email is inputed here");
  }
  if (!password) {
    res.status(401);
    throw new Error("no password is given");
  }
  if (password.length < 6) {
    res.status(401);
    throw new Error("small peanut , eat more to grow");
  }

  const UserExists = await User.findOne({ email });
  if (UserExists) {
    res.status(401);
    throw new Error("email is already existed");
  }

  const user = await User.create({
    name,
    email,
    password,
    phonenumber,
  });
  const token = getToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), //1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, password, photo, phonenumber } = user;

    res.status(201).json({
      _id,
      name,
      email,
      password,
      photo,
      token,
      phonenumber,
    });
  } else {
    res.status(401);
    throw new Error("no user is found");
  }
});

const loginRouter = asyncholder(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error("password or email is not found");
  }
  if (password.length < 6) {
    res.status(401);
    throw new Error("small peanut , eat more to grow");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("email is not found please register");
  }
  const HashPassword = bcrypt.compare(password, user.password);
  const token = getToken(user._id);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 100000 * 86400), //1 day
    sameSite: "none",
    secure: true,
  });

  if (user && HashPassword) {
    const { _id, name, email, password, photo } = user;
    res.status(200).json({
      _id,
      name,
      email,
      password,
      photo,
      token,
    });
  } else {
    res.status(400);
    throw new Error("hrllos ");
  }
});

const logOutrouter = asyncholder(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), //1 day
    sameSite: "none",
    secure: true,
  });
  return res.send("hello you are successfully log out");
});
const UserInformation = asyncholder(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { _id, name, email, photo, token } = user;

    res.status(201).json({
      _id,
      name,
      email,

      photo,
      token,
    });
  } else {
    res.status(401);
    throw new Error("no user is found");
  }
});
const loginUser = asyncholder(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401);
    throw new Error("this is a shame , that you dont have any token");
  }
  try {
    const verified = await jet.verify(token, process.env.JWT_SECRET);
    if (verified) {
      return res.status(200).json(true);
    } else {
      return res.status(400).json(false);
    }
  } catch (error) {
    // Handle any other errors that might occur during the verification process
    return res.status(500).json({ error: "Internal server error" });
  }
});
const UpdateUser = asyncholder(async (req, res) => {
  const user = await User.findById(req.user._id);
  // if(!user){
  //    res.status(401)
  //    throw new Error("Hello , you are not looged in ")

  // }

  if (user) {
    const { name, email, bio, phoneNumber, photo } = user;

    user.email = email;
    user.name = req.body.name || name;
    user.bio = req.body.bio || bio;
    user.phoneNumber = req.body.phoneNumber || phoneNumber;
    user.photo = req.body.photo || photo;
    const users = await user.save();
    res.status(201).json({
      name: users.name,
      email: users.email,
      bio: users.bio,
      phoneNumber: users.phoneNumber,
      photo: users.photo,
    });
  } else {
    res.status(401);
    throw new Error("nothing is found");
  }
});
const UpdatePassword = asyncholder(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("so no user is found");
  }

  const { oldpassword, password } = req.body;

  if (!oldpassword || !password) {
    res.status(401);
    throw new Error("no password is included");
  }
  const passwordMatched = bcrypt.compare(oldpassword, user.password);

  if (passwordMatched) {
    user.password = req.body.password;
    await user.save();

    res.status(201).json({
      message: "hello succesfullt changed the password",
    });
  }
});

const resetPassword = asyncholder(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("no user is found");
  }

  let Tokening = crypto.randomBytes(32).toString("hex") + user._id;

  console.log(Tokening);

  let HashToken = crypto.createHash("sha256").update(Tokening).digest("hex");
  console.log(HashToken);
  await new Token({
    userID: user._id,
    token: HashToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000),
  }).save();

  const resetUrl = `${process.env.FRONT_URL}/forgot/${Tokening}`;
  const message = `

   <h1>hello ${user.name} click this your accunt will be hacked , you can prevent this by giving me a kiss </h1>
   <a href=${resetUrl} clicktracking=off>link
   
   `;
  const subject = "reset the password";
  const send_to = req.body.email;
  const send_from = process.env.EMAIL_USER;

  try {
    await sendEmail(message, subject, send_from, send_to);
    res.status(200).json({ success: true, message: "suck my ass" });
  } catch (err) {
    res.status(500);
  }

  res.status(200).send("reseting password is successful");
});
const forgetPassword = asyncholder(async (req, res) => {
  const { password } = req.body;
  const { hashToken } = req.params;

  const newHashtoken = crypto
    .createHash("sha256")
    .update(hashToken)
    .digest("hex");

  const ExistedToken = await Token.findOne({
    token: newHashtoken,
    expiresAt: { $gt: Date.now() },
  });

  if (!ExistedToken) {
    res.status(404);
    throw new Error("no token is matched");
  }
  const user = await User.findById({ _id: ExistedToken.userID });
  user.password = password;
  await user.save();
  res.status(201).json({
    message: "password has been changed",
  });
});

module.exports = {
  userControl,
  loginRouter,
  logOutrouter,
  UserInformation,
  loginUser,
  UpdateUser,
  UpdatePassword,
  resetPassword,
  forgetPassword,
};
