const db = require("../db/query");
const passport = require("passport");
const bcrypt = require("bcryptjs");

async function getIndex(req, res) {
  const posts = await db.getPosts();
  console.log(req.user);
  res.render("index.ejs", {
    posts: posts,
    user: req.user,
  });
}
async function getLogIn(req, res) {
  if (req.isAuthenticated()) {
    res.send(`Hello, ${req.user.username}`);
  }
  res.render("login", { title: "LOGIN" });
}
async function loginFormPost(req, res) {
  console.log("logging in");
  console.log(req.session);
  try {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    });
    console.log("authenticated?");
    // res.redirect("/")
  } catch (err) {
    console.log(err);
  }
}
async function postMessage(req, res) {
  const { title, message } = req.body;
  const user = req.user;
  db.createPost(title, message, user);
  res.redirect("/");
}

async function getSignUp(req, res) {
  res.render("sign-up.ejs", { title: "Sign up" });
}
async function postSignUp(req, res) {
  const { firstName, secondName, nickname, password, secret } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    await db.createUser(firstName, secondName, nickname, hash, secret);
  });
  res.redirect("/");
}
async function getDelete(req, res) {
  const tile = req.params;
}

module.exports = {
  getLogIn,
  getIndex,
  getSignUp,
  postSignUp,
  postMessage,
  loginFormPost,
};
