const express = require('express');
const router = express.Router();
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.use(

  new SpotifyStrategy({

      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: 'http://localhost:8888/auth/spotify/callback'

    },

    function(accessToken, refreshToken, expires_in, profile, done) {

      redis.set(profile.id, 
      {accessToken, refreshToken, expires_in, profile});

      return done(err, profile);
      
    }

  )
  
);

passport.serializeUser(function(profile, done) {
  done(null, profile.id);
});

passport.deserializeUser(function(id, done) {

  redis.get(id, function (err, result) {
    done(err, result);
  });
  
});

app.get('/auth/spotify', passport.authenticate('spotify'), function(req, res) {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
});

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);