const express = require("express");
const compression = require("compression");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// Load Models
require("./models/User");

// Load Routes
const auth = require("./routes/api/auth");
const oauth = require("./routes/oauth/auth");

// Config Environment Vars
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Mongoose Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

// Express session Middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

// Compression Middleware
app.use(compression());

// Body-parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/auth", auth);
app.use("/auth", oauth);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Redirect to https
  // app.use("*", (req, res, next) => {
  //   if (req.headers["x-forwarded-proto"] === "https") {
  //     // OK, continue
  //     return next();
  //   }
  //   res.redirect("https://" + req.hostname + req.url);
  // });

  // Set static folder
  app.use(express.static("client/build"));
  // Send client assets
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
