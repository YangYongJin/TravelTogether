const router = require("express").Router();

const postController = require("../controllers/post");

const isAuth = require("../middleware/is-auth");

router.get("/posts", postController.getPosts);

router.post("/post", isAuth, postController.createPost);

router.get("/post/:postId", postController.getPost);

module.exports = router;
