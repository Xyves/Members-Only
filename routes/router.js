const { Router } = require("express");
const controller = require("../controllers/controller");
const appRouter = Router();
const passport = require("../controllers/passport-config");
// const passport = require
const auth = require("../controllers/auth");
appRouter.get("/", controller.getIndex);
appRouter.get("/login", controller.getLogIn);
appRouter.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome to the dashboard, ${req.user.username}`);
  } else {
    // res.redirect("/login");
  }
});
appRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err); // Pass error to error handling middleware
    if (!user) return res.status(401).json({ message: info.message }); // Handle authentication failure
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/"); // Success
    });
  })(req, res, next);
});
appRouter.get("/sign-up", controller.getSignUp);
appRouter.post(
  "/sign-up",
  auth.createUserValidation(),
  auth.validateMiddleware,
  controller.postSignUp
);
appRouter.post("/addPost", controller.postPost);
appRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
appRouter.post("/delete/:id", controller.deletePost);
module.exports = appRouter;
