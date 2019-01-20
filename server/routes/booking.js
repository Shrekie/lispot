const express = require('express');
const router = express.Router();
const lobby = require('../lispot_core/lobby');
const { authenticated } = require('../middleware/guard');

router.get('/book', authenticated('/createroom'), (req, res) => {
  res.json(lobby.book());
});

module.exports = router;