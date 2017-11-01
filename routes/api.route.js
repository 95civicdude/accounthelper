var express = require('express');
var router = express.Router();
var clients = require('./api/clients.route');

router.use('/clients', clients);

module.exports = router;