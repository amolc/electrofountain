var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var categoryCRUD = CRUD(connection, 'category');


router.post('/addcategory', function(req, res) {
  console.log('Category :', req.body);
  categoryCRUD.create({
    'category_name': req.body.category_name,
    'category_description': req.body.category_description,
    'category_type': req.body.category_type,
    'category_alias': '',
    'created_on': env.timestamp(),
    'modified_on': env.timestamp()
  }, function(error, result) {
    if (result) {
      responsedata = {
        status: true,
        record: result,
        category_id: result.insertId,
        message: 'Category Added Successfully'
      };
      res.jsonp(responsedata);
    } else {
      responsedata = {
        status: false,
        record: result,
        message: 'Failed to Add Category'
      };
      res.jsonp(responsedata);
    }
  });
});

router.post('/getcategories', function(req, res) {
  categoryCRUD.load({}, function(error, result) {
    if (result) {
      responsedata = {
        status: true,
        record: result,
        message: 'Category List'
      };
      res.jsonp(responsedata);
    } else {
      responsedata = {
        status: false,
        record: result,
        message: 'Failed to Fetch Category List'
      };
      res.jsonp(responsedata);
    }
  });
});

router.post('/deletecategory', function(req, res) {
  categoryCRUD.destroy({
    category_id: req.body.category_id
  }, function(error, result) {
    console.log(result);
    if (result) {
      responsedata = {
        status: true,
        record: result,
        message: 'Category Deleted'
      };
      res.jsonp(responsedata);
    } else {
      responsedata = {
        status: false,
        record: result,
        message: 'Failed to Delete Category'
      };
      res.jsonp(responsedata);
    }
  });
});

module.exports = router;
