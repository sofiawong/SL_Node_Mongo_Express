const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

// db.collection is not a function, https://stackoverflow.com/questions/43779323/typeerror-db-collection-is-not-a-function
// https://mongodb.github.io/mongo-csharp-driver/2.5/apidocs/html/M_MongoDB_Driver_MongoCollection_Drop.htm
MongoClient.connect(url, (err, client) => {
  const conFusionDatabase = client.db('myDatabaseNameAsAString');
  assert.equal(err, null);

  console.log('Connected correctly to server');

  dboper.insertDocument(
client, { name: 'Vadonut', description: 'Test' },
    'dishes', (result) => {
      console.log('Insert Document:\n', result.ops);
      dboper.findDocuments(client, 'dishes', (docs) => {
        console.log('Found Documents:\n', docs);
        dboper.updateDocument(
client, { name: 'Vadonut' }, { description: 'Updated Test' }
          , 'dishes', (results) => {
            console.log('Updated Document:\n', result.result);
            dboper.findDocuments(client, 'dishes', (docs) => {
              console.log('Found Updated Documents:\n', docs);
              const collection = conFusionDatabase.collection('dishes');
              collection.drop((result) => {
                console.log('Dropped Collection: ', result);
                client.close();
              });
            });
          }
);
      });
    }
);
  /* const collection = conFusionDatabase.collection("dishes");
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
     */
});
