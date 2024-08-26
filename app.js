const express = require("express");
const ejs = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
var passport = require("passport");
const session = require("express-session");
const usersRouter = require("./routes/router");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
// app.use(passport.authenticate("session"));
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  console.log("Current User:", req.user);
  res.locals.currentUser = req.user;
  next();
});

app.use("/", usersRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
