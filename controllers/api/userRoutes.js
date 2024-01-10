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

// post route to check users login username and pass, if it exists in db create new session
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect user or password, please try again" });
      return;
    }

    const password = await userData.checkPassword(req.body.password);

    if (!password) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

module.exports = router;
