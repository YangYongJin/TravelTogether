const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      message: "posts Success",
      posts: posts,
    });
  } catch (err) {
    err.status = 500;
    err.message = "Some Error Occur";
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const {
      title,
      startDate,
      endDate,
      content,
      preference,
      contact,
    } = req.body;
    const post = await Post.create({
      title,
      content,
      preference,
      contact,
      startDate,
      endDate,
      user,
    });
    res.status(201).json({
      message: "posts create success",
      post: post,
    });
  } catch (err) {
    err.status = 500;
    err.message = "Some Error Occur";
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById({ _id: postId });
    if (!post) {
      err.status = 404;
      err.message = "No Post";
      return next(err);
    }
    res.status(200).json({
      message: "get post Success",
      post: post,
    });
  } catch (err) {
    err.status = 500;
    err.message = "Some Error Occur";
    next(err);
  }
};
