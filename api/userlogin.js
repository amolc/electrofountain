var express = require('express');
var router = express.Router();
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var userCRUD = CRUD(connection, 'user');
var md5 = require('md5');

router.post('/login', function(req, res) {
  console.log('Request ',req.body);
  var email = req.body.user_email;
  var password = md5(req.body.user_password);
  userCRUD.load({
    email_id: email,
    password: password
  }, function(err, val) {
    var resdata = {
      record: '',
      status: false,
      message: 'err'
    };
    if (val.length > 0) {
      resdata.record = val;
      resdata.status = true;
      resdata.message = 'successfully login welcome ';
      res.jsonp(resdata);
    } else {
      resdata.status = false;
      resdata.message = 'Wrong user name or password';
      res.jsonp(resdata);
    }
  });
});

router.post('/signup', function(req, res) {
  var password = md5(req.body.user_password);
  userCRUD.load({
    email_id: req.body.user_email,
  }, function(err, val) {
    if (val.length > 0) {

      var resdata = {
        record: '',
        status: false,
        message: 'user already exists..'
      };
      console.log("error", err);
      res.jsonp(resdata);
    } else {

      userCRUD.create({
        'email_id': req.body.user_email,
        'password': password,
        'created_on': env.timestamp(),
        'modified_on': env.timestamp()
      }, function(error, result) {
        if (result) {
          responsedata = {
            status: true,
            record: result,
            message: 'user created'
          };
          res.jsonp(responsedata);
        } else {
          responsedata = {
            status: false,
            record: result,
            message: 'user failed to create'
          };
          console.log("error:", error);
          res.jsonp(responsedata);
        }
      });
    }
  });
});

router.post('/adminsignup', function(req, res) {
  console.log("body:",req.body);
  var password = md5(req.body.password);
  userCRUD.load({
    email_id: req.body.email,
    user_type:req.body.usertype
  }, function(err, val) {
    if (val.length > 0) {

      var resdata = {
        record: '',
        status: false,
        message: 'User Already Exists..'
      };
      console.log("error", err);
      res.jsonp(resdata);
    } else {

      userCRUD.create({
        'email_id': req.body.email,
        'password': password,
        'user_type':req.body.usertype,
        'created_on': env.timestamp(),
        'modified_on': env.timestamp()
      }, function(error, result) {
        if (result) {
          responsedata = {
            status: true,
            record: result,
            message: 'admin created'
          };
          res.jsonp(responsedata);
        } else {
          responsedata = {
            status: false,
            record: result,
            message: 'admin failed to create'
          };
          console.log("error:", error);
          res.jsonp(responsedata);
        }
      });
    }
  });
});

module.exports = router;
