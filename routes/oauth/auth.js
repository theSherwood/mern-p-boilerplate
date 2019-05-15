const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth" }),
  (req, res) => {
    const { googleID, handle, email, id } = req.user;
    const payload = {
      id,
      googleID,
      handle,
      email
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        res.redirect("/jwt/" + token);
      }
    );
  }
);

// Github OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth" }),
  function(req, res) {
    const { githubId, handle, email, id } = req.user;
    const payload = {
      id,
      githubId,
      handle,
      email
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        res.redirect("/jwt/" + token);
      }
    );
  }
);

module.exports = router;
