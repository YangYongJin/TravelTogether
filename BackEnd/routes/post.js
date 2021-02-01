const router = require("express").Router();

const postController = require("../controllers/post");

const isAuth = require("../middleware/is-auth");

router.get("/posts", postController.getPosts);

router.post("/post", isAuth, postController.createPost);

router.get("/post/:postId", postController.getPost);

router.put("/post/:postId", isAuth, postController.updatePost);

router.delete("/post/:postId", isAuth, postController.deletePost);

module.exports = router;
