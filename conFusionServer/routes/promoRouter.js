const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('The promo will be sent to you');
    })
    .post((req, res, next) => {
        res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description)
    })
    .put((req, res, next) => {
        res.end('PUT operation is not supported on /promotions');
    })
    .delete((req, res, next) => {
        res.end('Deleted all the promotions');
    });

promoRouter.route('/:promoId')
    .get((req, res, next) => {
        res.end('The details of the promotion is ' + req.params.promoId);
    })
    .post((req, res, next) => {
        res.end('POST operation is not supported on /promotions');
    })
    .put((req, res, next) => {
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.body.name + ' with details: ' +
            req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting the promotion with a id of ' + req.params.promoId);
    });

module.exports = promoRouter;