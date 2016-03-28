var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var billingCRUD = CRUD(connection,'user');

exports.updatebillingaddress = function(req,res){
	console.log("req:",req.body);
		if(req.body.companyname == 'undefined' || req.body.companyname == 0)
		{
			req.body.companyname = "";
			console.log("company name blank or 0");
		}
		billingCRUD.update({
				'id':req.body.userid,
			},{
				'first_name':req.body.first_name,
				'last_name':req.body.last_name,
				'company_name':req.body.company_name,
				'address':req.body.address,
				'city':req.body.city,
				'state':req.body.state,
				'country':req.body.country,
				'zip':req.body.zip,
				'mobile_number':req.body.mobile_number,
				'apartment':req.body.apartment,
				'modified_on':env.timestamp()
			},function(error, result) {
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
}

exports.getuserdetails = function(req,res){
  	 console.log("req body:",req.body);
  	  billingCRUD.load({
  	  	'id': req.body.userid
  	  },function(error, result) {
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
}