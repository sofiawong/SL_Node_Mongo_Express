const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
const leader = require('../models/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
  .get((req, res, next) => {
    leader.find({})
      .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    leader.create(req.body)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      } ,(err) => next(err))
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.end('PUT operation is not supported on /leaders');
  })
  .delete((req, res, next) => {
    leader.remove({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

leaderRouter.route('/:leaderId')

  .get((req, res, next) => {
    leader.findById(req.params.leaderId)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
      }, (err) => next(err))
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.end('POST operation is not supported on');
  })
  .put((req, res, next) => {
    leader.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
      }, { new: true })
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
      } , (err) => next(err))
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    leader.findByIdAndRemove(req.params.leaderId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      },(err) => next(err))
      .catch((err) => next(err));
  });

module.exports = leaderRouter;