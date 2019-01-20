const express = require('express');
const router = express.Router();
const history = require('connect-history-api-fallback');
const path = require('path');

const clientPath = __dirname + '/../../web';

router.use(history({
  verbose: true,
}));

router.use('/', express.static(path.join(clientPath + '/dist')));
router.use('/', express.static(path.join(clientPath + '/templates')));

module.exports = router;