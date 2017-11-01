// Need to get the mongoose model
var Client = require('../models/client.model');

// Saving the context of the module in the _this variable
_this = this;

// Async function to get the ToDo List
exports.getClients = async function(query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    };

    // Try catch the awaited promise to handle errors
    try {
        var clients = await Client.paginate(query, options);

        // Return the Todos list
        return clients;
    } catch (e) {
        throw Error('Error while Paginating Clients');
    }
}

exports.createClient = async function(client) {

    // Creating the mongoose object with the new keyword
    var newClient = new Client({
        clientName 		 : client.clientName,
        platform		 : client.platform,
        cluster			 : client.cluster,
        ui_version 		 : client.ui_version,
        brandName		 : client.brandName,
        accountName		 : client.accountName,
        accountDirector  : client.accountDirector
    });

    try {
        // Save the Client
        var savedClient = await newClient.save();

        return savedClient;
    } catch(e) {
        throw Error('Error creating Client');
    }
}

exports.updateClient = async function(client) {
    var id = client.id;

    try {
        // Find the old Client Object by the id
        var oldClient = await Client.findById(id);
    } catch(e) {
        throw Error('Error finding the client');
    }

    // If no old Client Object exists return false
    if (!oldClient) {
        return false;
    }

    console.log(oldClient);

    // Edit the Client Object
    oldClient.clientName = client.clientName;
    oldClient.platform = client.platform;
    oldClient.cluster = client.cluster;
    oldClient.ui_version = client.ui_version;
    oldClient.brandName = client.brandName;
    oldClient.accountName = client.accountName;
    oldClient.accountDirector = client.accountDirector;

    console.log(oldClient);

    try {
        var savedClient = await oldClient.save();
        return savedClient;
    } catch(e) {
        throw Error('Error while updating the Client');
    }
}

exports.deleteClient = async function(id) {
    // Delete the Client
    try {
        var deleted = await Client.remove({ _id: id });
        if (deleted.result.n === 0) {
            throw Error('Client could not be deleted');
        }
        return deleted;
    } catch(e) {
        throw Error('Error occured while deleting the client');
    }
}