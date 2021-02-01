const jwt = require("jsonwebtoken");

const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const err = new Error("No Auth Header!");
      err.status = 401;
      return next(err);
    } else {
      const token = authHeader.split(" ")[1];
      if (token === "undefined" || !token) {
        const err = new Error("No token!");
        err.status = 401;
        return next(err);
      } else {
        const decoded = jwt.verify(token, "secret");
        if (!decoded) {
          const err = new Error("Not Verified Token");
          err.status = 401;
          return next(err);
        } else {
          const now = Math.floor(Date.now() / 1000);
          // if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
          //   const token = jwt.sign(
          //     {
          //       userId: decoded.userId,
          //       email: decoded.email,
          //     },
          //     "secret",
          //     {
          //       expiresIn: "2h",
          //     }
          //   );
          //   res.cookie("access_token", token, {
          //     maxAge: 1000 * 60 * 60 * 24 * 7,
          //     httpOnly: true,
          //     overwrite: true,
          //   });
          // }
          req.userId = decoded.userId;
          next();
        }
      }
    }
  } catch (err) {
    err.status = 401;
    err.message = "Auth Failed";
    return next(err);
  }
};
