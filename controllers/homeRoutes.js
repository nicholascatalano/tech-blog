const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

// GET route for homepage
router.get("/", async (req, res) => {
  try {
    // finds all existing posts
    const postData = await Post.findAll({
      include: [User],
    });
    // deserialize
    const posts = postData.map((post) => post.get({ plain: true }));
    // render on allPosts view
    res.render("home", {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET single post by id /post/:id
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    if (postData) {
      const post = postData.get({ plain: true });
      // render on singlePost view
      res.render("onePost", {
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
