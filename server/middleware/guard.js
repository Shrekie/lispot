var authenticated = (req, res, next) => {

  if (!req.isAuthenticated()) {

    console.log("👻 SESSION NOT VALID 👻");

    res.status(401);
    res.json({ error: "Session no longer valid." });

  } else {
    next();
  }

}

module.exports =  { authenticated };