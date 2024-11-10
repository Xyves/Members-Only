const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/query.js");
const passport = require("passport");

passport.use(
  new LocalStrategy(
    { usernameField: "nickname", passwordField: "password" },
    async (nickname, password, done) => {
      try {
        const user = await db.getUser(nickname);
        if (!user) {
          console.log("User not found");
          return done(null, false, { message: "Incorrect nickname" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    if (!user) {
      console.log("User not found in deserializeUser");
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    console.log("Error in deserializeUser:", err);
    done(err); // Handle any errors
  }
});
module.exports = passport;
