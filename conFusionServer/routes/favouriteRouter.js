const express = require('express');
const bodyParser = require('body-parser');
const favouriteRouter = express.Router();
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Favourites = require('../models/favourite');
const dishes = require('../models/dishes');
favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/') //declaring endpoint at a single location
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req,res,next) => {
    Favourites.find({})
      .populate("user")
      .populate("dishes")
      .then((favourites) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favourites);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    Favourites.findOne({user: req.user._id}, (err , favourite) => {
      if(err) {
        err = new Error('Error');
        err.statusCode = 403;
        return next(err);
      } else if (favourite) {
        for (let i = 0; i < req.body.length; i ++) {
          if (((favourite.dishes.indexOf(req.body[i]._id) !== -1)) === false) {
            favourite.dishes.push(req.body[i]);
            favourite.save()
              .then((favourites) => {
                console.log('Favourite Created', favourites);
                res.json(favourites);
              }, (err) => next(err));
          }
          else {
            res.end('The dish id: ' + req.body[i]._id + ' will not be added as it is existed');
            return next(err);
          }
        } 
      } else  {
        Favourites.create({user: req.user._id})
          .then((favourite) => {
            if (favourite != null) {
              favourite.dishes = req.body;
              //favourites.dishes.push(req.body._id);
              favourite.save()
                .then((favourite) => {
                  console.log('Favourite Created', favourite);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(favourite);
                }, (err) => next(err));
            }
          });
      }
    });
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id})
      .then((favourite) => {
        if (favourite) {
          Favourites.remove({})
            .then((resp) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(resp);
            }, (err) => next(err))
        } else {
          res.end('Document does not exist to be deleted');
        }
      }).catch((err) => next(err));
  });

favouriteRouter.route('/:dishId')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /favourites/' + req.params.dishId);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favourites.findOne({user: req.user._id}, (err , favourite) => {
      if(err) {
        err = new Error('Document not found');
        err.statusCode = 403;
        return next(err);
      } else if (favourite) {
        if (((favourite.dishes.indexOf(req.params.dishId) !== -1)) === false) {
          favourite.dishes.push(req.params.dishId);
          favourite.save()
            .then((favourites) => {
              console.log('Favourite Created', favourites);
              res.json(favourites);
            }, (err) => next(err));
        }
        else {
          res.end('The dish id: ' + req.params.dishId + ' will not be added as it is existed');
        }
      } else {
        Favourites.create({user: req.user._id})
          .then((favourite) => {
            if (favourite != null) {
              favourite.dishes = req.params.dishId;
              //favourites.dishes.push(req.body._id);
              favourite.save()
                .then((favourites) => {
                  console.log('Favourite Created', favourites);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(favourites);
                }, (err) => next(err));
            }
          });
      }
    })
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favourites/' + req.params.dishId);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req,res, next) => {
    Favourites.findOne({user: req.user._id})
    .then((favourite) => {
        if (((favourite.dishes.indexOf(req.params.dishId) !== -1)) === true) {
          favourite.dishes.remove(req.params.dishId);
          favourite.save()
            .then((resp) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(resp);
            })
            .catch((err) => next(err));
        } else {
          res.end('There are no dish found to be deleted');
        }
    })
    .catch((err) => next(err));
  });

module.exports = favouriteRouter;