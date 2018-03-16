const assert = require('assert');

exports.insertDocument = (client, document, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    coll.insert(document, (err, result) => {
        assert.equal(err,null);
        console.log("Inserted " + result.result.n + 
        "documents into the collection " + collection);
        callback(result);
    });
};

exports.findDocuments = (client, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    coll.find({}).toArray((err,docs) => {
    assert.equal(err,null);
    callback(docs);
    });
};

exports.removeDocument = (client, document, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    coll.deleteOne(document, (err, result) => {
    assert.equal(err, null);
    console.log("Removed the document ", document);
    callback(result);
    });
};

exports.updateDocument = (client, document, update, collection, callback) => {
    const conFusionDatabase = client.db('myDatabaseNameAsAString');
    const coll = conFusionDatabase.collection("dishes");
    coll.updateOne(document, {$set: update} , null, (err, result) => {
        assert.equal(err,null);
        console.log("Update the document with", update);
        callback(result);
    });
};


