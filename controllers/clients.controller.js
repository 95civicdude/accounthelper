// Accessing the service
var ClientService = require('../services/clients.service');

// Saving the context to the _this variable
_this = this;

// Async Controller function to get the To Do list
exports.getClients = async function(req, res, next) {

    // Check the existence of the query parameter. If they don't exist, set defaults
    var page = req.query.page ? req.query.page: 1;
    var limit = req.query.limit ? req.query.limit: 10;

    try {
        var clients = await ClientService.getClients({}, page, limit);

        // Return the clients list with the appropriate HTTP status code and warnings.
        return res.status(200).json({ status:200, data:clients, message:"Successfully received Clients" });
    } catch(e) {
        // Return an error
        return res.status(400).json({ status:400, message: e.message });
    }
}

exports.createClient = async function(req, res, next) {

    // Req.Body contains the form submit values.
    var client = {
        clientName 		 : req.body.clientName,
        platform		 : req.body.platform,
        cluster			 : req.body.cluster,
        ui_version 		 : req.body.ui_version,
        brandName		 : req.body.brandName,
        accountName		 : req.body.accountName,
        accountDirector  : req.body.accountDirector
    };

    try {
        // Calling the Service function with the new object from the Request Body
        var createdClient = await ClientService.createClient(client);
        return res.status(201).json({ status:201, data:createdClient, message:"Succesfully Created Client" });
    } catch(e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status:400, message:"Client Creation was Unsuccesfull" });
    }
}

exports.updateClient = async function(req, res, next) {
    
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status:400, message:"Id must be present" });
    }

    var id = req.body._id;

    console.log(req.body);

    var client = {
        id,
        clientName      : req.body.clientName ? req.body.clientName : null,
        platform        : req.body.platform ? req.body.platform : null,
        cluster         : req.body.cluster ? req.body.cluster : null,
        ui_version      : req.body.ui_version ? req.body.ui_version : null,
        brandName       : req.body.brandName ? req.body.brandName : null,
        accountName     : req.body.accountName ? req.body.accountName : null,
        accountDirector : req.body.accountDirector ? req.body.accountDirector : null
    };

    try {
        var updatedClient = await ClientService.updateClient(client);
        return res.status(200).json({ status:200, data:updatedClient, message:"Succesfully Updated Client" });
    } catch(e) {
        return res.status(400).json({ status:400, message:e.message });
    }
}

exports.removeClient = async function(req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await ClientService.deleteClient(id);
        return res.status(204).json({ status:204, message:"Succesfully Deleted Client" });
    } catch(e) {
        return res.status(400).json({ status:400, message:e.message });
    }
}