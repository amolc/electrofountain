var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var billingCRUD = CRUD(connection, 'user');
var ordersCRUD = CRUD(connection, 'orders');
var order_detailsCRUD = CRUD(connection, 'order_details');
var stripe = require('stripe')('sk_test_y0BiTcY7tiFEIWTrOggOGKVY');
var async = require('async');


router.post('/charge', function(req, res, next) {

    var billingData = req.body;

    stripe.charges.create({
        amount: billingData.totalAmount * 100,
        currency: 'sgd',
        source: billingData.stripeToken,
        description: 'Transaction for purchase ' + billingData.stripeToken
    }, function(err, charge) {
        if (err) {
            return next(err);
        } else {

            //    console.log('charge', charge);
            billingData.charge_id = charge.id;
            // create order

            createOrder(billingData, function(res_order) {

                 //console.log('Response ', res_order);
                if (res_order.status === 1) {
                    billingData.status = true;
                    billingData.metaData.order_id = res_order.order_id;
                    //  create order Details

                    createOrderDetails(billingData.metaData, function(res_order_details) {
                  //      console.log('res_order_details ', res_order_details);
                        res.jsonp(billingData);
                    });
                } else {
                    billingData.status = false;
                    res.jsonp(billingData);
                }
            });
        }
    });


    function createOrder(data, callback) {

        var status = 0;
        ordersCRUD.create({
            'customer_id': data.customer_id,
            'order_date': env.timestamp(),
            'order_status': 'placed',
            'comment': 'ordered placed ' + data.stripeToken,
            'stripe_id': data.stripeToken,
            'created_on': env.timestamp(),
            'modified_on': env.timestamp()
        }, function(error, result) {
            if (error) {
                console.log('error', error);
                callback({
                    status: 0
                });
            } else {
                // console.log('result ', result);
                callback({
                    status: 1,
                    order_id: result.insertId
                });
            }
        });
    }

    function createOrderDetails(data, callback_order) {

      console.log('data order id',data.order_id);
        // order_detailsCRUD
        async.forEach(data, function(single_item, callback) {

            order_detailsCRUD.create({
                'order_id': data.order_id,
                'item_id': single_item._id,
                'quantity_ordered': single_item._quantity,
                'price_each': single_item._price,
                'product_detail': single_item._name,
                'created_on': env.timestamp(),
                'modified_on': env.timestamp()
            }, function(error, result) {
                if (error) {
                    console.log('error create order details', error);
                    callback();
                } else {
                    callback();
                }
            });
        }, function(async_error, async_value) {
            if (async_error) {
                callback_order({
                    status: 0
                });
            } else {
                callback_order({
                    status: 1
                });
            }
        });
    }

});

router.post('/getorders', function(req, res) {

  ordersCRUD.load({
    'customer_id':req.body.customer_id
  }, function(error, result) {
      if (result) {
          responsedata = {
              status: true,
              record: result,
              message: 'Order List'
          };
          res.jsonp(responsedata);
      } else {
          responsedata = {
              status: false,
              error: error,
              message: 'Failed to Fetch Order List'
          };
          res.jsonp(responsedata);
      }
  });

});

router.post('/getorderdetails', function(req, res) {

  order_detailsCRUD.load({
    'order_id':req.body.order_id
  }, function(error, result) {
      if (result) {
          responsedata = {
              status: true,
              record: result,
              message: 'Order List'
          };
          res.jsonp(responsedata);
      } else {
          responsedata = {
              status: false,
              error: error,
              message: 'Failed to Fetch Order List'
          };
          res.jsonp(responsedata);
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
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'Billing Address Failed to Update'
            };
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
            };
            res.jsonp(responsedata);
        } else {
            responsedata = {
                status: false,
                record: result,
                message: 'User Details Failed to Get..'
            };
            res.jsonp(responsedata);
        }
    });
});

module.exports = router;
