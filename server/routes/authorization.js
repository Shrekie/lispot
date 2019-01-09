const express = require('express');
const Redis = require('ioredis');
const router = express.Router();
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const redis = new Redis(6379, process.env.REDIS_URL);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new SpotifyStrategy({

      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback'

    },

    (accessToken, refreshToken, expires_in, profile, done) => {

      redis.set(profile.id, 
      {accessToken, refreshToken, expires_in, profile});

      return done(null, profile);
      
    }

  )
);

passport.serializeUser((profile, done) => {
  done(null, profile.id);
});

passport.deserializeUser(function(id, done) {

  redis.get(id, function (err, result) {
    done(err, result);
  });
  
});

router.get('/auth/spotify', passport.authenticate('spotify'), (req, res) => {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
});

router.get('/auth/spotify/callback',

  passport.authenticate('spotify', { failureRedirect: '/login' }),

  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  }

);

module.exports = router;