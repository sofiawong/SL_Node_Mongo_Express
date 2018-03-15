const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';


MongoClient.connect(url, (err, client) => {
  
  const conFusionDatabase = client.db('myDatabaseNameAsAString');
  assert.equal(err,null);

  console.log('Connected correctly to server');

  const collection = conFusionDatabase.collection("dishes");
  collection.insertOne({"name": "Uthappizza", "description": "test"},
    (err, result) => {
      assert.equal(err,null);

      console.log("After Insert:\n");
      console.log(result.ops);

      collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
            
        console.log("Found:\n");
        console.log(docs);

        collection.drop((err, result) => {
          assert.equal(err,null);

          client.close();
        });
      });
    });
});