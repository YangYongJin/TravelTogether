const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

export const postSignup = async (req, res, next) => {
  const { name, email, password, age, sex } = req.body;
  try {
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
        name: name,
        email: email,
      },
      "secret",
      {
        expiresIn: "2h",
      }
    );
    res
      .cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
        httpOnly: true,
      })
      .status(201)
      .json({
        message: "createUserSuccessfully",
        user: user,
      });
  } catch (err) {
    err.status = 401;
    err.message = "Signup Failed";
    next(err);
  }
};

export const postLogin = (req, res, next) => {};

export const postLogout = (req, res, next) => {};
