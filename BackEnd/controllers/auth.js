const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.postSignup = async (req, res, next) => {
  const { name, email, password, age, sex } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const err = new Error("Email already exists");
      err.status = 401;
      return next(err);
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      age: age,
      sex: sex,
    });
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: email,
      },
      "secret",
      {
        expiresIn: "2h",
      }
    );
    res.status(201).json({
      message: "createUserSuccessfully",
      user: user,
      token: token,
    });
  } catch (err) {
    err.status = 401;
    err.message = "Signup Failed";
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (!existUser) {
      const err = new Error("Wrong Email");
      err.status = 401;
      return next(err);
    }
    const result = await bycrypt.compare(password, existUser.password);
    if (!result) {
      const err = new Error("Wrong password!");
      err.status = 401;
      return next(err);
    } else {
      const token = jwt.sign(
        {
          userId: existUser._id.toString(),
          email: email,
        },
        "secret",
        {
          expiresIn: "2h",
        }
      );
      res.status(201).json({
        message: "user login successful",
        user: existUser,
        token: token,
      });
    }
  } catch (err) {
    err.status = 401;
    err.message = "Login Failed";
    next(err);
  }
};

exports.postLogout = (req, res, next) => {
  res.status(201).json({
    message: "logout",
  }); // No Content
};
