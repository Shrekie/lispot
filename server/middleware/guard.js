var authenticated = function(req, res, next){

  if (!req.isAuthenticated()) {

    req.session.redirectTo = req.path;
    res.redirect('/auth/spotify');

  } else {
    next();
  }

};

module.exports =  { authenticated };