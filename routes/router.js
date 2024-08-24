const { Router } = require("express");
const controller = require("../controllers/controller");
const appRouter = Router();
const passport = require("passport");
const auth = require("../controllers/auth");
appRouter.get("/", controller.getIndex);
appRouter.get("/login", controller.getLogIn);
// appRouter.post("/login", (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       console.log("Authentication failed:", info.message);
//       return res.redirect("/login");
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       console.log("User logged in successfully:", user);
//       return res.redirect("/");
//     });
//   })(req, res, next);
// });
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
appRouter.post("/login", controller.loginFormPost);

module.exports = appRouter;
