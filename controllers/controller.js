const db = require("../db/query");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  console.log("serializeUser");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserializeUser");
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

async function getIndex(req, res) {
  const posts = await db.getPosts();
  console.log(req.user);
  res.render("index.ejs", {
    posts: posts,
    user: req.user,
  });
}
async function getLogIn(req, res) {
  res.render("login", { title: "LOGIN" });
}
async function postMessage(req, res) {
  const { title, message } = req.body;
  const user = req.user;
  db.createPost(title, message, user);
  res.redirect("/");
}

async function postLogIn(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
}

// run passport, check the username and hashed password comparison in db, if correct log in and redirect to "/"
async function getSignUp(req, res) {
  res.render("sign-up.ejs", { title: "Sign up" });
}
async function postSignUp(req, res) {
  const { firstName, secondName, nickname, password, secret } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    await db.createUser(firstName, secondName, nickname, hash, secret);
  });
  res.redirect("/");

  // Check if the user with the same nickname exists: IF NOT create new user in db, log him, redirect to main page
}
async function getDelete(req, res) {
  const tile = req.params;
}

module.exports = {
  getLogIn,
  getIndex,
  postLogIn,
  getSignUp,
  postSignUp,
  postMessage,
};
