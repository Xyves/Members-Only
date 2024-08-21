const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/query");

console.log("passport-config.js is being loaded");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    console.log("LocalStrategy is being executed");
    try {
      const { rows } = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        console.log("User not found");
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("Incorrect password");
        return done(null, false, { message: "Incorrect password" });
      }

      console.log("User authenticated successfully");
      return done(null, user);
    } catch (err) {
      console.log("Error during authentication", err);
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("serializeUser called:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserializeUser called with ID:", id);
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
