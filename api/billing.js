var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var billingCRUD = CRUD(connection, 'user');
var stripe = require('stripe')('sk_test_y0BiTcY7tiFEIWTrOggOGKVY');


router.post('/charge', function(req, res, next) {
  console.log('req.body.stripeToken', req.body.stripeToken);
    stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        source: req.body.stripeToken,
        description: 'One time deposit for'
    }, function(err, charge) {
        if (err) {
            return next(err);
        } else {
            console.log('charge', charge);
						res.jsonp(charge);
						// save in db
        }
    });
});



router.post('/updatebillingaddress', function(req, res) {
    if (req.body.companyname == 'undefined' || req.body.companyname === 0) {
        req.body.companyname = "";
    }
    billingCRUD.update({
        'id': req.body.userid,
    }, {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'company_name': req.body.company_name,
        'address': req.body.address,
        'city': req.body.city,
        'state': req.body.state,
        'country': req.body.country,
        'zip': req.body.zip,
        'mobile_number': req.body.mobile_number,
        'apartment': req.body.apartment,
        'modified_on': env.timestamp()
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'Billing Address successfully Updated'
            }
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Billing Address Failed to Update'
            }
            res.jsonp(responsedata);
        }
    });
});


router.post('/getuserdetails', function(req, res) {
    billingCRUD.load({
        'id': req.body.userid
    }, function(error, result) {
        if (result) {
            responsedata = {
                status: true,
                record: result,
                message: 'User Details'
            }
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'User Details Failed to Get..'
            }
            res.jsonp(responsedata);
        }
    });
});

module.exports = router;
