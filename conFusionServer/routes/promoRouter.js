const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
const promotion = require('../models/promotions');
const authenticate = require('../authenticate');
promoRouter.use(bodyParser.json());
const cors = require('./cors');

promoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
  .get(cors.cors, (req, res, next) => {
    promotion.find({})
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(promotions);
      } , (err) => next(err))
      .catch((err) => next(err))
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    promotion.create(req.body)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('PUT operation is not supported on /promotions');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    promotion.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err))
  });

promoRouter.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
  .get(cors.cors, (req, res, next) => {
    promotion.findById(req.params.promoId)
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.end('POST operation is not supported on /promotions');
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    promotion.findByIdAndUpdate(req.params.promoId , {
      $set: req.body
    } , {new: true})
      .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
      }, (err) => next(err))
      .catch((err) => next(err));        
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    promotion.findByIdAndRemove(req.params.promoId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = promoRouter;