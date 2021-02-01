const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const region = req.query.region;
    const posts = await Post.find({
      region: region,
    });
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
    const region = req.query.region;
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
      region,
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

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    let post = await Post.findById({ _id: postId });
    if (!post) {
      err.status = 404;
      err.message = "No Post";
      return next(err);
    }
    const {
      title,
      startDate,
      endDate,
      content,
      preference,
      contact,
    } = req.body;
    post = {
      ...post,
      title,
      startDate,
      endDate,
      content,
      preference,
      contact,
    };
    const updatedPost = await post.save();
    res.status(200).json({
      message: "update post Success",
      post: updatedPost,
    });
  } catch (err) {
    err.status = 500;
    err.message = "Some Error Occur";
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findByIdAndDelete({ _id: postId });
    console.log(post);
    if (!post) {
      err.status = 404;
      err.message = "No Post";
      return next(err);
    }
    res.status(200).json({
      message: "delete Post",
    });
  } catch (err) {
    err.status = 500;
    err.message = "Some Error Occur";
    next(err);
  }
};
