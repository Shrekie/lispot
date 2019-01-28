const express = require('express');
const router = express.Router();
const redis = require('../modules/redis');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const { authenticated } = require('../middleware/guard');

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new SpotifyStrategy({

      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback'

    },

    (accessToken, refreshToken, expires_in, profile, done) => {

      let expires = Math.round(new Date().getTime() / 1000) + (expires_in-60);
      
      redis.set(profile.id, JSON.stringify({accessToken, 
      refreshToken, expires, profile}));

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
router.get('/auth/spotify', passport.authenticate('spotify', {
  scope: ["streaming", "user-read-birthdate", "user-read-email", "user-read-private"]
}), (req, res) => {
});

// Get token
router.get('/user', authenticated, (req, res) => {

  res.status(200);
  res.json(req.user);
  // #TODO: auto refresh token

});

router.get('/auth/spotify/callback',

  passport.authenticate('spotify', { failureRedirect: '/login' }),

  (req, res) => {
    
    res.redirect("/login")

  }

);

module.exports = router;