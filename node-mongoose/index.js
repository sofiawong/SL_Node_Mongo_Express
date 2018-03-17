const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
//useMongoClient is no longer needed;

connect.then((db) => {
  console.log('Connected correctly to server');

  const newDish = Dishes({
    name: 'James',
    description: 'test',
  });

  newDish.save()
    .then((dish) => {
      console.log(dish);
      return Dishes.find({}).exec();
    })
    .then((dishes) => {
      console.log(dishes);
      return Dishes.collection.drop();
      // reference: https://stackoverflow.com/questions/11453617/mongoose-js-remove-collection-or-db
    })
    .then(() => {
      return mongoose.connection.close();
      // reference: https://stackoverflow.com/questions/8813838/properly-close-mongooses-connection-once-youre-done
    })
    .catch((err) => {
      console.log(err);
    });
});