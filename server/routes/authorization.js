const express = require('express');
const router = express.Router();
const redis = require('../modules/redis');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

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
      JSON.stringify({accessToken, refreshToken, expires_in, profile}));

      return done(null, profile);
      
    }

  )
);

passport.serializeUser((profile, done) => {
  return done(null, profile.id);
});

passport.deserializeUser((id, done) => {

  redis.get(id, function (err, result) {
    return done(err, result);
  });
  
});

// Create session token
router.get('/auth/spotify', passport.authenticate('spotify'), (req, res) => {

});

router.get('/auth/spotify/callback',

  passport.authenticate('spotify', { failureRedirect: '/login' }),

  (req, res) => {
    
    res.redirect("/login")

  }

);

module.exports = router;