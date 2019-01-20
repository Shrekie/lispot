var authenticated = (route) => { 
  
  return (req, res, next) => {

    if (!req.isAuthenticated()) {

      req.session.redirectTo = route;
      res.redirect('/auth/spotify');

    } else {
      next();
    }

  }

};

module.exports =  { authenticated };