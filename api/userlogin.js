var express = require('express');
var http = require('http');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var userCRUD = CRUD(connection,'user');
var md5 = require('md5');

exports.login = function(req,res){
  	  var email = req.body.user_email;
      var password = md5(req.body.user_password);
      userCRUD.load({
        email_id : email,
        password : password
      }, function (err, val) {
        var resdata={
            record:'',
            status:false,
            message :'err'
        };
        if(val.length>0){
	        resdata.record=val;
	        resdata.status=true;
	        resdata.message='successfully login welcome ';
	        res.jsonp(resdata);
	      }else{
          resdata.status = false;
          resdata.message = 'Wrong user name or password';
          res.jsonp(resdata);
      }
	});
}

exports.signup = function(req,res){
      var password = md5(req.body.user_password); 
      userCRUD.load({
        email_id : req.body.user_email,
      }, function (err, val) {
        if(val.length>0){
          
            var resdata={
                record:'',
                status:false,
                message :'user already exists..'
            };
            console.log("error",err);
            res.jsonp(resdata);
        }else{

        userCRUD.create({
            /*'first_name': req.body.user_fname,
            'last_name': req.body.user_lname,*/
            'email_id': req.body.user_email,
            'password': password,
            'created_on':env.timestamp(),
            'modified_on':env.timestamp()
          },function(error, result) {
          if (result) {
            responsedata = {
              status: true,
              record: result,
              message: 'user created'
            }
            res.jsonp(responsedata);
          } else {
            responsedata = {
              status: false,
              record: result,
              message: 'user failed to create'
            }
            console.log("error:",error);
            res.jsonp(responsedata);
          }
        });
          
      }
  });
}