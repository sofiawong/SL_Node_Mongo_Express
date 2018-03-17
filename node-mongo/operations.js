const assert = require('assert');

exports.insertDocument = (client, document, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    return coll.insert(document);
};

exports.findDocuments = (client, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    return coll.find({}).toArray();
};

exports.removeDocument = (client, document, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    return coll.deleteOne(document);
};

exports.updateDocument = (client, document, update, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    return coll.updateOne(document, {$set: update} , null);
};


