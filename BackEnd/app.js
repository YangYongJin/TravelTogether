const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const path = require("path");
const morgan = require('morgan');
// const multer = require('multer');

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

const MONGODB_URI =
  "mongodb+srv://kinggodjinny:rktdydwls61@cluster0.8cgyf.gcp.mongodb.net/traveltogether?retryWrites=true&w=majority";

const app = express();

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'))

// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
// );
app.use("/images", express.static(path.join(__dirname, "images")));


// handling cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use("/post", postRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || 'Undefined Error';
  res.status(status).json({
    message: message,
  });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
