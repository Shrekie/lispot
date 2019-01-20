const express = require('express');
const router = express.Router();
const room = require('../core/room');
const { authenticated } = require('../middleware/guard');

router.get('/book', authenticated('/create'), (req, res) => {
  res.json(room.book());
});

module.exports = router;