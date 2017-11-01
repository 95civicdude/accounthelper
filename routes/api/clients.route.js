var express = require('express');
var router = express.Router();

// Getting the Todo Controller that we just created
var ClientController = require('../../controllers/clients.controller');

// Map each API to the Controller functions
router.get('/', ClientController.getClients);
router.post('/', ClientController.createClient);
router.put('/', ClientController.updateClient);
router.delete('/:id', ClientController.removeClient);

// Export the Router
module.exports = router;