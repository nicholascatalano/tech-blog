const router = require("express").Router();
const { User } = require("../../models");

// route to create new User session
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      (req.session.userId = userData.id),
        (req.session.username = userData.username),
        (req.session.loggedIn = true),
        res.json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
