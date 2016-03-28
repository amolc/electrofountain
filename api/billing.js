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
				'first_name':req.body.firstname,
				'last_name':req.body.lastname,
				'company_name':req.body.companyname,
				'address':req.body.address,
				'city':req.body.city,
				'state':req.body.state,
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
