const { Router } = require("express");
const controller = require("../controllers/controller");
const appRouter = Router();
const auth = require("../controllers/auth");
const passport = require("passport");
appRouter.get("/", controller.getIndex);
appRouter.get("/login", controller.getLogIn);
appRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
appRouter.get("/sign-up", controller.getSignUp);
appRouter.post(
  "/sign-up",
  auth.createUserValidation(),
  auth.validateMiddleware,
  controller.postSignUp
);
appRouter.post("/addPost", controller.postMessage);
appRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = appRouter;
