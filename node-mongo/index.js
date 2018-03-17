const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

// db.collect`ion is not a function, https://stackoverflow.com/questions/43779323/typeerror-db-collection-is-not-a-function
// https://mongodb.github.io/mongo-csharp-driver/2.5/apidocs/html/M_MongoDB_Driver_MongoCollection_Drop.htm
// https://stackoverflow.com/questions/19498650/how-to-drop-collection-from-database-in-mongodb-using-mongo-db-java-driver
MongoClient.connect(url).then((client) => {
  const conFusionDatabase = client.db('conFusion');
  //assert.equal(err, null);

  console.log('Connected correctly to server');

  dboper.insertDocument(client, { name: 'Vadonut', description: 'Test' },'dishes')
    .then((result) => {
      console.log('Insert Document:\n', result.ops);
      return dboper.findDocuments(client, 'dishes');
    })
    .then((docs) => {
      console.log('Found Documents:\n', docs);
      return dboper.updateDocument(
        client, { name: 'Vadonut' }, { description: 'Updated Test' }
        , 'dishes');
    })
    .then((result) => {
      console.log('Updated Document:\n', result.result);
      return dboper.findDocuments(client, 'dishes');
    })
    .then((docs) => {
      console.log('Found Updated Documents:\n', docs);
      const collection = conFusionDatabase.collection('dishes');
      return collection.drop();
    })
    .then((result) => {
      console.log('Dropped Collection: ', result);
      return client.close();
    })
    .catch((err) => console.log(err));

}, (err) => console.log(err))
.catch((err) => console.log(err));

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
