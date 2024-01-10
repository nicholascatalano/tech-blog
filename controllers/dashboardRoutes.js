const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// GET route, withAuth, to find all user posts
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    // deserialize postData
    const posts = postData.map((post) =>
      post.get({
        plain: true,
      })
    );
    res.render("allPostsAdmin", { layout: "dashboard", posts });
  } catch (err) {
    // if withAuth fails or user has no posts, redirect to login
    res.redirect("login");
  }
});

module.exports = router;
