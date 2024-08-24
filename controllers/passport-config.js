const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/query.js");
const passport = require("passport");

const strategy = new LocalStrategy(async (username, password, done) => {
  console.log("LocalStrategy is being executed");
  try {
    const user = await db.getUser(username);
    console.log(user);

    if (!user) {
      console.log("User not found");
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Incorrect password");
      return done(null, false, { message: "Incorrect password" });
    }

    console.log("username and password worked");
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log("serializeUser called:", user);
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserializeUser called with ID:", id);
    const user = await db.getUserById(id);
    if (!user) {
      console.log("User not found in deserializeUser");
      return done(null, false); // User not found
    }
    console.log("User found in deserializeUser:", user); // This should log the user object
    done(null, user); // Attach the user object to req.user
  } catch (err) {
    console.log("Error in deserializeUser:", err);
    done(err); // Handle any errors
  }
});
