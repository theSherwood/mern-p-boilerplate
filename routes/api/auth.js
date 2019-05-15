const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const User = require("../../models/User");

// @route     POST /api/auth/login
// @desc      Login for email and password
// @access    Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check String Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "That email doesn't match our records";
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Create JWT payload
        const payload = {
          id: user.id,
          email: user.email,
          handle: user.handle
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "That password doesn't match our records";
        return res.status(404).json(errors);
      }
    });
  });
});

// @route     POST /api/auth/register
// @desc      Register with email and password
// @access    Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "That email is already registered";
      return res.status(400).json(errors);
    } else {
      // Check String Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json("success"))
            .catch(err => console.error(err));
        });
      });
    }
  });
});

// @route     GET /api/auth/current
// @desc      Return current user
// @access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, handle, email } = req.user;
    res.json({ id, handle, email });
  }
);

module.exports = router;
