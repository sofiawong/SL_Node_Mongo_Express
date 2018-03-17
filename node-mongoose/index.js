const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
//useMongoClient is no longer needed;

connect.then((db) => {
  console.log('Connected correctly to server');

  Dishes.create({
    name: 'James',
    description: 'test',
  })
    .then((dish) => {
      console.log(dish);
      return Dishes.findByIdAndUpdate(dish._id, {
        $set: {description: 'Updated test'} 
    },{new: true} //once update of dish is complete, it will return updated dish back to us
     );
    })
    .then((dish) => {
      console.log(dish);
      dish.comments.push({
        rating: 5,
        comment: 'I\'m getting a sinking feeling',
        author: 'Leonardo di Carpaccio'
      });
      // return Dishes.collection.drop();
      return dish.save();
      // reference: https://stackoverflow.com/questions/11453617/mongoose-js-remove-collection-or-db
    })
    .then((dish) => {
      console.log(dish);
      return Dishes.collection.drop();
    })
    .then(() => {
      return mongoose.connection.close();
      // reference: https://stackoverflow.com/questions/8813838/properly-close-mongooses-connection-once-youre-done
    })
    .catch((err) => {
      console.log(err);
    });
});