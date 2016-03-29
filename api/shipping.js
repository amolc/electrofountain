var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var shipping = CRUD(connection,'shipping_address');

exports.updateshippingaddress = function(req,res){
	console.log("req body:",req.body);
		if(req.body.companyname == 'undefined' || req.body.companyname == 0)
		{
			req.body.companyname = "";
		}
		shipping.create({
				'customer_id':req.body.userid,
				'shipping_first_name':req.body.shipping_first_name,
				'shipping_last_name':req.body.shipping_last_name,
				'shipping_mobile_number':req.body.shipping_mobile_number,
				'shipping_address':req.body.shipping_address,
				'shipping_apartment':req.body.shipping_apartment,
				'shipping_city':req.body.shipping_city,	
				'shipping_state':req.body.shipping_state,
				'shipping_country':req.body.shipping_country,
				'shipping_zip':req.body.shipping_zip,
				'company_name':req.body.company_name,
				'created_on':env.timestamp(),				
				'modified_on':env.timestamp()
			},function(error, result) {
			if (result) {
				responsedata = {
					status: true,
					record: result,
					message: 'Shipping Address successfully Added'
				}
				console.log("error:",error);
				res.jsonp(responsedata);
			} else {
				responsedata = {
				status: false,
				record: result,
				message: 'Shipping Address Failed to Add'
				}
				console.log("error:",error);
				res.jsonp(responsedata);
			}
		});
}

exports.getshippingaddress = function(req,res){
  	 
  	  shipping.load({
  	  	'customer_id': req.body.userid
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'User Details'
	      }
	      console.log("error:",error);
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'User Details Failed to Get..'
	      }
	      console.log("error:",error);
	      res.jsonp(responsedata);
	    }
  });
}
