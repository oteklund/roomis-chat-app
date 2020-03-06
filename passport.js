const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Opts for JWT Strategy. secret from .env and JWT from header
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

// Load User Model
const User = require('./db/schemat/userSchema');

// LOCAL STRATEGY - Used with login
module.exports = function(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        let user = await User.findOne({ username });
        if (!user) {
          // Return null for errors, false for user (no match) and custom message
          return done(null, false, { message: 'Invalid credentials' });
        }
        // Comparing input password with hashed db password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          // return null for errors and user for user
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid credentials' });
        }
      } catch (err) {
        console.error(err.message);
      }
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // JWT STRATEGY (used with routes where login is required):
  passport.use(
    new JWTstrategy(opts, async (jwt_payload, done) => {
      try {
        let user = await User.findOne({ _id: jwt_payload.id });
        if (!user) {
          return done(null, false);
        } else {
          // null for errors, user for user
          return done(null, user);
        }
      } catch (err) {
        console.error(err.message);
      }
    })
  );
};
