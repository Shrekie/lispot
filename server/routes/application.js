const express = require('express');
const router = express.Router();
const path = require('path');
const { authenticated } = require('../middleware/guard');

const clientPath = __dirname + '/../../client';

router.use('/dist', express.static(path.join(clientPath + '/dist')));

router.get('/homenow', authenticated, function(req, res){
  res.sendFile(path.join(clientPath + '/index.html'));
});

module.exports = router;