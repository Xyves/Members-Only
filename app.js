const express = require("express");
const ejs = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const passport = require("./controllers/passport-config");
// var passport = require("passport");
const session = require("express-session");
const usersRouter = require("./routes/router");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1d
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.use("/", usersRouter);
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
