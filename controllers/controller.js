const db = require("../db/query");
const passport = require("./passport-config");
const bcrypt = require("bcryptjs");

async function getIndex(req, res) {
  const posts = await db.getPosts();
  res.render("index.ejs", {
    posts: posts,
    user: req.user,
  });
}
async function getLogIn(req, res) {
  if (req.isAuthenticated()) {
    return res.send(`Hello, ${req.user.username}`);
  }
  res.render("login", { title: "Please Log In" });
}

async function postPost(req, res) {
  const { title, message } = req.body;
  const { nickname } = res.locals.user;
  try {
    await db.createPost(title, message, nickname);
    res.redirect("/");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getSignUp(req, res) {
  res.render("sign-up.ejs", { title: "Sign up" });
}
async function postSignUp(req, res) {
  const { firstName, secondName, nickname, password, secret } = req.body;
  bcrypt.hash(password, 10, async function (err, hash) {
    await db.createUser(firstName, secondName, nickname, hash, secret);
  });
  res.redirect("/login");
}
async function deletePost(req, res) {
  const { id } = req.params;
  await db.deletePost(id);
  res.redirect("/");
}

module.exports = {
  getLogIn,
  getIndex,
  getSignUp,
  postSignUp,
  postPost,
  deletePost,
};
